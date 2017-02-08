import {Person} from "./Person";
import {Inject} from "@angular/core";
import {MATH_UTIL} from "./app/shared/util/math-util";
import {FAIRNESS} from "./app/shared/util/fairness";

// Zuteilung einer Person
export class Allocation {
  private _scoreInPercent: number;
  constructor(
    private _allocation: string[],
    private _person: Person
  ) { }

  public isValid(): boolean {
    if (this.allocation.length < 0 || !this.person) return false;
    return true;
  }

  public setScoreInPercent(value: number) {
    this._scoreInPercent = value;
  }

  get scoreInPercent(): number {
    return this._scoreInPercent ? this._scoreInPercent : 0;
  }

  get score(): number {
    return FAIRNESS.getPersonScoreByAllocation(this);
  }

  get allocation(): string[] {
    return this._allocation;
  }

  get person(): Person {
    return this._person;
  }
}
