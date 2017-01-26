import {Injectable, Inject} from '@angular/core';
import {ConstantsService} from "./constants.service";
import {Plan} from "../Plan";
import {Person} from "../Person";

@Injectable()
// TODO: Logik verfeinern --> Fairness wird niedriger, wenn Blöcke kleiner werden zum Beispiel
export class FairnessService {
  constructor(
    @Inject(ConstantsService) private constants // Injecting von einem Service in einen anderen muss so gemacht werden.
  ) { }

  public getPersonsScoreInProcent(plan: Plan): Array<{person: Person, score: number}> {
    var returnArray = Array<{person: Person, score: number}>();
    var scoresPerPerson = Array<number>();
    for (var index = 0; index < plan.allocations.length; index++) {
      scoresPerPerson.push(this.calculateScoreOfArray(plan.allocations[index].allcation));
    }
    var max = Math.max.apply(this, scoresPerPerson);
    if (plan.allocations.length !== scoresPerPerson.length) throw "Something went wrong"; // TODO: Exception Handling
    for (var index = 0; index < plan.allocations.length; index++) {
      returnArray.push({person: plan.allocations[index].person,
                        score: this.calculateProcentValue(scoresPerPerson[index], max)});
    }
    return returnArray;
  }

  public getPlanScoreInProcent(personsScoreInProcent: Array<{person: Person, score: number}>): number {
    var max = Math.max.apply(this, personsScoreInProcent.map(function(o){return o.score}));
    var min = Math.min.apply(this, personsScoreInProcent.map(function(o){return o.score}));
    return this.calculateProcentValue(min, max);
  }

  private getSumOfArray(array: Array<number>): number {
    var sum = 0;
    for(var i = 0; i < array.length; i++) {
      if (typeof array[i] === 'number') sum += array[i];
    }
    return sum;
  }

  private calculateProcentValue(value: number, from: number): number {
    return (Math.abs(value) / Math.abs(from)) * 100;
  }

  private calculateScoreOfArray(allocation: string[]): number { // TODO: Throwing Exception
    if (!allocation || allocation.length <= 0) return;
    var fairness = 0;
    for (var i = 0; i < allocation.length; i++) {
      var dutyType = allocation[i];
      var sumTemp = 0;
      var countLoops = 1;
      var fieldValue = 0;
      if (allocation[i] === this.constants.duty) fieldValue = this.constants.dutyWorth;
      if (allocation[i] === this.constants.free) fieldValue = this.constants.freeWorth;
      if (allocation[i] === this.constants.reserve) fieldValue = this.constants.reserveWorth;
      while (i < allocation.length && dutyType === allocation[i]) {
        sumTemp += (countLoops * fieldValue);
        i++;
        countLoops += 1;
      }
      i--; // wenn der while-Loop verlassen wurde, ist der Counter +1 zu hoch
      fairness += sumTemp;
    }
    return fairness;
  }
}
