import {Mode} from "./Mode";
import {Allocation} from "./Allocation";
/**
 * Created by Andrin on 16.01.2017.
 */

export class Plan {
  get title(): string {
    return this._title;
  }

  get modus(): Mode {
    return this._modus;
  }

  get zuteilung(): Allocation[] {
    return this._zuteilung;
  }
  constructor(
    private _title: string,
    private _modus: Mode,
    private _zuteilung: Allocation[]
  ){ }
}
