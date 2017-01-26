import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  private _duty = 'd';
  private _free = undefined;
  private _reserve = 'r';
  private _dutyWorth = 2;
  private _reserveWorth = 1;
  private _freeWorth = 0;

  constructor() { }

  get duty(): string {
    return this._duty;
  }

  get free(): any {
    return this._free;
  }

  get reserve(): string {
    return this._reserve;
  }

  get dutyWorth(): number {
    return this._dutyWorth;
  }

  get reserveWorth(): number {
    return this._reserveWorth;
  }

  get freeWorth(): number {
    return this._freeWorth;
  }
}
