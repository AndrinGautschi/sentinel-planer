import { Injectable } from '@angular/core';
import { Sentinel } from '../Sentinel';
import {Plan} from "../Plan";

@Injectable()
export class SentinelDataService {
  private _sentinel: Sentinel;
  private _plans: Plan[];

  constructor() {
    this._plans = new Array<Plan>();
  }

  public resetSentinelData() {
    this._sentinel = null;
    this._plans = new Array<Plan>();
  }

  public getPlanByIndex(index: number): Plan {
    if (this._plans.length < index || index < 0 ) return;
    return this._plans[index];
  }

  public addPlan(plan:Plan): void {
    this._plans.push(plan);
  }

  public setSentinel(value: Sentinel) {
    this._sentinel = value;
  }

  get sentinel(): Sentinel {
    return this._sentinel;
  }

  get plans(): Plan[] {
    return this._plans;
  }

}
