import { Injectable } from '@angular/core';
import { Sentinel } from '../Sentinel';
import {Plan} from "../Plan";

@Injectable()
export class SentinelDataService {
  private _sentinel: Sentinel;
  private _plans: Plan[]

  // Damit die Views bei 'zurück' oder 'weitergehen' (Browser back or forward) updated bleiben
  private _plansAreGenerated: Array<boolean> = Array<boolean>();
  private _sentinelDataInputForm;

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

  public setPlansAreGenerated(index: number, value: boolean) {
    if (index < this._plansAreGenerated.length || index > this._plansAreGenerated.length) return;
    this._plansAreGenerated[index] = value;
  }

  public setSentinelDataInputForm(value) {
    this._sentinelDataInputForm = value;
  }

  get plansAreGenerated(): Array<boolean> {
    return this._plansAreGenerated;
  }

  get sentinelDataInputForm() {
    return this._sentinelDataInputForm;
  }

  get sentinel(): Sentinel {
    return this._sentinel;
  }

  get plans(): Plan[] {
    return this._plans;
  }
}
