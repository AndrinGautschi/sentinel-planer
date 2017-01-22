import { Injectable } from '@angular/core';
import { Wacht } from '../Wacht';
import {Plan} from "../Plan";

@Injectable()
export class WachtDataService {
  private _wacht: Wacht;
  private _plaene: Plan[];

  get wacht(): Wacht {
    return this._wacht;
  }

  get plaene(): Plan[] {
    return this._plaene;
  }

  public setSentinel(value: Wacht) {
    this._wacht = value;
  }

  constructor() {
    this._plaene = new Array<Plan>();
  }

  public reset() {
    this._wacht = null;
    this._plaene = new Array<Plan>();
  }
  public getPlan(index: number): Plan {
    if (this._plaene.length < index || index < 0 ) return;
    return this._plaene[index];
  }

  public addPlan(plan:Plan): void {
    this._plaene.push(plan);
  }

}
