import { BasePrinter } from './base-printer';
import { CharacterSet } from './character-set';

interface Options {
  characterSet?: CharacterSet;
}

export class EpsonPrinter extends BasePrinter {
  constructor(options?: Options) {
    super(options);
  }
}
