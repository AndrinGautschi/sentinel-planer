import {Mode} from "./Mode";
import {Allocation} from "./Allocation";
/**
 * Created by Andrin on 16.01.2017.
 */

export class Plan {
  constructor(
    private _title: string,
    private _mode: Mode,
    private _allocations: Allocation[]
  ){ }

  get title(): string {
    return this._title;
  }

  get mode(): Mode {
    return this._mode;
  }

  get allocations(): Allocation[] {
    return this._allocations;
  }

}
