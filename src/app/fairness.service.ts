import { Injectable } from '@angular/core';
import {Allocation} from "../Allocation";

// TODO: In Service auslagern?
const duty = 'd';
const free = undefined;
const reserve = 'r';
const usefulnessDuty = -2;
const usefulnessFree = 2;
const usefulnessReserve = -1;

@Injectable()
// TODO: Den logischen Fehler beheben! Wenn jeder gleich viel arbeitet, ist der Durchschnitt 50, was aber nicht als Indikator für den Plan stehen darf
export class FairnessService {

  constructor() { }

  public getAverage(array: Array<number>): number {
    var sum = 0;
    for(var i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return Math.abs(sum) / array.length;
  }

  public calculateProcentValue(min: number, max: number, value: number): number {
    var temp = min ? min : 0;
    return (Math.abs(value) / (Math.abs(max) + Math.abs(temp))) * 100; // TODO: Workaround bereinigen
  }

  public calculateFairness(zuteilung: string[]): number {
    if (!zuteilung || zuteilung.length <= 0) return;
    var fairness = 0;
    for (var i = 0; i < zuteilung.length; i++) {
      var dutyType = zuteilung[i];
      var sumTemp = 0;
      var countLoops = 1;
      var fieldValue = 0;
      if (zuteilung[i] === duty) fieldValue = usefulnessDuty;
      if (zuteilung[i] === free) fieldValue = usefulnessFree;
      if (zuteilung[i] === reserve) fieldValue = usefulnessReserve;
      while (i < zuteilung.length && dutyType === zuteilung[i]) {
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
