import type { JSONContent } from '@tiptap/core';
import type { Align, Printer } from '../printer';
import { updatedDiff } from 'deep-object-diff';
import { ESC } from '../printer/commands/common';

type MarksNonNullable = NonNullable<JSONContent['marks']>;

type QrCodeAttrs = {
  data: string;
  size: string;
  level: string;
};

type StyleState = {
  bold: boolean;
  textAlign: Align;
  highlight: boolean;
};

const defaultStyleState: StyleState = {
  bold: false,
  textAlign: 'left',
  highlight: false,
};

export class WysiwygParser {
  private styleState: StyleState = { ...defaultStyleState };

  constructor(private readonly printer: Printer) {}

  parse(data: JSONContent) {
    // console.log('data', JSON.stringify(data));
    if (data.type !== 'doc') throw new Error('First node must be doc');

    if (!data.content) throw new Error('Where are content?');

    this.printer.initialize();

    for (const node of data.content) {
      switch (node.type) {
        case 'paragraph':
          this.paragraph(node.content, node.attrs);
          break;

        case 'qrCode':
          this.qrCode(node.attrs as QrCodeAttrs);
          break;

        default:
          break;
      }
    }

    this.printer.cut();
    // this.printer.raw(new Uint8Array([ESC, 0x4a, 16]));
    this.printer.cashdraw('5pin');
    this.printer.debug();
    return this.printer.getData();
  }

  private paragraph(content?: JSONContent[], attrs?: JSONContent['attrs']) {
    if (attrs && 'textAlign' in attrs) {
      this.updateTextAlign(attrs['textAlign'] as Align);
    }

    for (const node of content ?? []) {
      if (node.type === 'text') {
        if (!node.text) continue;
        this.updateMarks(node.marks ?? []);
        this.printer.text(node.text);
      }
    }

    this.printer.newLine();
  }

  private qrCode({ data, size, level }: QrCodeAttrs) {
    this.printer.qrcode(data, { cellSize: 7 });
  }

  private updateTextAlign(align: Align) {
    const stateToUpdate = { ...this.styleState };
    stateToUpdate.textAlign = align;

    const diff = updatedDiff(this.styleState, stateToUpdate);
    if ('textAlign' in diff) {
      this.printer.setAlign(align);
    }

    this.styleState = { ...this.styleState, ...diff };
  }

  private updateMarks(marks: MarksNonNullable) {
    const stateToUpdate = { ...defaultStyleState, textAlign: this.styleState.textAlign };
    for (const mark of marks) {
      if (mark.type === 'bold') {
        stateToUpdate.bold = true;
      } else if (mark.type === 'highlight') {
        stateToUpdate.highlight = true;
      }
    }

    const diff = updatedDiff(this.styleState, stateToUpdate);
    if ('bold' in diff) {
      this.printer.setTextBold(diff['bold'] as boolean);
    }
    if ('highlight' in diff) {
      this.printer.invert(diff['highlight'] as boolean);
    }

    this.styleState = { ...this.styleState, ...diff };
  }
}
