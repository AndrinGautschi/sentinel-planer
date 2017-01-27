import {Mode} from "./Mode";
import {Allocation} from "./Allocation";
import {FAIRNESS} from "./app/util/fairness";
import {MATH_UTIL} from "./app/util/math-util";

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

  get score(): number { // Setzt beim Aufruf (Ressourcen sparen) alle dem Plan angehängten Allocation-Scores ebenfalls
    var allocationScores = this._allocations.map(function(allocation){return allocation.score;});
    var max = Math.max.apply(this, allocationScores);
    var min = Math.min.apply(this, allocationScores);
    this._allocations.forEach(
      function(allocation: Allocation){
        allocation.setScoreInPercent(MATH_UTIL.getPercent(allocation.score, max));
      });
    return MATH_UTIL.getPercent(min, max);
  }
}

