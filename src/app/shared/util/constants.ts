export class CONSTANTS {
  static get duty() {
    return 'd'
  }
  static get dutyWorth() {
    return 2;
  }
  static get reserve() {
    return 'r'
  }
  static get reserveWorth() {
    return 1;
  }
  static get free() {
    return undefined;
  }
  static get freeWorth() {
    return 0;
  }
  static get printSheetShift() { // TODO: Rename
    return 6; // Der Plan beginnt um 0600 und dauert 24 Stunden
  }
  static get printSheetLength() {
    return 24; // Pro Print Plan werden 24h abgedeckt
  }
}
