import type { CharacterSet } from './character-set';
import { alignment } from './commands/alignment';
import { cashdraw } from './commands/cashdraw';
import { LF } from './commands/common';
import { cut } from './commands/cut';
import { initialize } from './commands/initialize';
import { invert } from './commands/invert';
import { qrcodeCellSize } from './commands/qrcodeCellSize';
import { qrcodeCorrectionLevel } from './commands/qrcodeCorrectionLevel';
import { qrcodeModel } from './commands/qrcodeModel';
import { qrcodePrint } from './commands/qrcodePrint';
import { qrcodeStore } from './commands/qrcodeStore';
import { textBold } from './commands/textBold';
import { textMode } from './commands/textMode';
import { textUnderline } from './commands/textUnderline';
import { encode } from './encode';
import type { Align, CashDrawerPin, Printer, QRCodeOptions, TextUnderline } from './printer';

export interface BasePrinterOptions {
  characterSet?: CharacterSet;
}

interface Cmd {
  name: string;
  args?: unknown[];
  data: number[];
}

export class BasePrinter implements Printer {
  protected cmds: Cmd[] = [];
  protected characterSet: CharacterSet;

  protected constructor(options?: BasePrinterOptions) {
    this.characterSet = options?.characterSet ?? 'pc437_usa';
  }

  setTextBold(bold: boolean): this {
    this.cmds.push({
      name: 'setTextBold',
      args: [bold],
      data: textBold(bold ? 1 : 0),
    });
    return this;
  }

  setTextUnderline(underline: TextUnderline): this {
    const n = (() => {
      switch (underline) {
        case '1dot-thick':
          return 1;
        case '2dot-thick':
          return 2;
        case 'none':
          return 0;
      }
    })();

    this.cmds.push({
      name: 'setTextUnderline',
      args: [underline],
      data: textUnderline(n),
    });
    return this;
  }

  setTextNormal(): this {
    this.cmds.push({
      name: 'setTextNormal',
      data: textMode(0),
    });
    return this;
  }

  setAlign(align: Align): this {
    const n = (() => {
      switch (align) {
        case 'left':
          return 0;
        case 'center':
          return 1;
        case 'right':
          return 2;
      }
    })();

    this.cmds.push({
      name: 'setAlign',
      args: [align],
      data: alignment(n),
    });
    return this;
  }

  invert(enabled: boolean): this {
    this.cmds.push({
      name: 'invert',
      args: [enabled],
      data: invert(enabled ? 1 : 0),
    });
    return this;
  }

  text(data: string): this {
    this.cmds.push({
      name: 'text',
      args: [data],
      data: Array.from(encode(data, this.characterSet)),
    });
    return this;
  }

  raw(data: Uint8Array): this {
    this.cmds.push({
      name: 'raw',
      args: [data],
      data: Array.from(data),
    });
    return this;
  }

  newLine(): this {
    this.cmds.push({
      name: 'newLine',
      data: [LF],
    });
    return this;
  }

  cut(): this {
    this.cmds.push({
      name: 'cut',
      data: cut(80),
    });
    return this;
  }

  qrcode(data: string, options: QRCodeOptions = {}): this {
    const { model = 'model2', cellSize = 3, correction = 'L' } = options;
    const modelValue = (() => {
      switch (model) {
        case 'model1':
          return 49;
        case 'model2':
          return 50;
        case 'micro':
          return 51;
      }
    })();
    this.cmds.push({
      name: 'qrcodeModel',
      args: [model],
      data: qrcodeModel(modelValue),
    });

    this.cmds.push({
      name: 'qrcodeCellSize',
      args: [cellSize],
      data: qrcodeCellSize(cellSize),
    });

    const correctionValue = (() => {
      switch (correction) {
        case 'L':
          return 48;
        case 'M':
          return 49;
        case 'Q':
          return 50;
        case 'H':
          return 51;
      }
    })();
    this.cmds.push({
      name: 'qrcodeCorrection',
      args: [correction],
      data: qrcodeCorrectionLevel(correctionValue),
    });

    const encoded = encode(data, 'pc437_usa'); // ascii
    const length = new ArrayBuffer(2);
    const view = new DataView(length);
    view.setUint16(0, encoded.byteLength + 3, true);

    const pL = view.getUint8(0);
    const pH = view.getUint8(1);

    this.cmds.push({
      name: 'qrcodeStore',
      args: [data],
      data: qrcodeStore(pL, pH, encoded),
    });
    this.cmds.push({
      name: 'qrcodePrint',
      data: qrcodePrint(),
    });

    return this;
  }

  cashdraw(pin: CashDrawerPin): this {
    const m = (() => {
      switch (pin) {
        case '2pin':
          return 0;
        case '5pin':
          return 1;
      }
    })();

    this.cmds.push({
      name: 'cashdraw',
      args: [pin],
      data: cashdraw(m, 0x19, 0x78),
    });

    return this;
  }

  initialize(): this {
    this.cmds.push({
      name: 'initialize',
      data: initialize(),
    });
    return this;
  }

  getData(): Uint8Array {
    const data = this.cmds.flatMap((x) => x.data);
    return new Uint8Array(data);
  }

  clear(): this {
    this.cmds = [];
    return this;
  }

  debug(): this {
    console.log(this.cmds);
    return this;
  }
}
