import { CharacterSet } from './character-set';
import { EpsonPrinter } from './epson-printer';
import { Printer } from './printer';

export type PrinterType = 'epson' | 'star';

export interface PrinterOptions {
  type: PrinterType;
  characterSet?: CharacterSet;
}

export function getPrinter({ type, ...options }: PrinterOptions): Printer {
  switch (type) {
    case 'epson':
      return new EpsonPrinter(options);

    default:
      throw new Error('Printer not recognized');
  }
}

export type { CharacterSet } from './character-set';
export * from './printer';
export { EpsonPrinter } from './epson-printer';
