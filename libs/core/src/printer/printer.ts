export type Align = 'left' | 'center' | 'right';
export type TextUnderline = '1dot-thick' | '2dot-thick' | 'none';
export interface QRCodeOptions {
  /** @default model2 */
  model?: 'model1' | 'model2' | 'micro';
  /** @default 3 */
  cellSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /**
   * Recovery Capacity (%)
   * - L : 7%
   * - M : 15%
   * - Q : 25%
   * - H : 30%
   * @default L
   */
  correction?: 'L' | 'M' | 'Q' | 'H';
}

export type CashDrawerPin = '2pin' | '5pin';

export interface Printer {
  // setCharacterSet(set: CharacterSet): this;
  // setTextFont(font: TextFont): this;
  setTextBold(bold: boolean): this;
  // setTextSize(width: TextSize, height: TextSize): this;
  setTextUnderline(underline: TextUnderline): this;
  setTextNormal(): this;
  setAlign(align: Align): this;
  invert(enabled: boolean): this;
  text(data: string): this;
  raw(data: Uint8Array): this;
  newLine(): this;
  cut(): this;
  // image(image: Image, options?: ImageToRasterOptions): this;
  qrcode(data: string, options?: QRCodeOptions): this;
  // barcode(data: string, type: BarcodeType, options?: BarcodeOptions): this;
  cashdraw(pin: CashDrawerPin): this;
  initialize(): this;
  getData(): Uint8Array;
  clear(): this;
  debug(): this;
}
