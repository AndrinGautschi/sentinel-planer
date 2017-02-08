import {CONSTANTS} from "./constants";
import {Allocation} from "../../../Allocation";

export class FAIRNESS {
  // TODO: In einen Service verschieben
  public static getPersonScoreByAllocation(allocation: Allocation): number {
    if (!allocation || allocation.allocation.length <= 0) return; //TODO: Exception handling

    var score = 0;
    for (var i = 0; i < allocation.allocation.length; i++) {
      var dutyType = allocation.allocation[i];
      var sumTemp = 0;
      var countLoops = 1;
      var fieldValue = 0;
      if (allocation.allocation[i] === CONSTANTS.duty) fieldValue = CONSTANTS.dutyWorth;
      if (allocation.allocation[i] === CONSTANTS.free) fieldValue = CONSTANTS.freeWorth;
      if (allocation.allocation[i] === CONSTANTS.reserve) fieldValue = CONSTANTS.reserveWorth;
      while (i < allocation.allocation.length && dutyType === allocation.allocation[i]) {
        sumTemp += (countLoops * fieldValue);
        i++;
        countLoops += 1;
      }
      i--; // wenn der while-Loop verlassen wurde, ist der Counter +1 zu hoch
      score += sumTemp;
    }

    return score;
  }
}
