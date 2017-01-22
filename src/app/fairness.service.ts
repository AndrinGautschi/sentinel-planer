import { Injectable } from '@angular/core';
import {Zuteilung} from "../Zuteilung";

// TODO: In Service auslagern?
const dienst = 'd';
const frei = undefined;
const reserve = 'r';
const wertDienst = -2;
const wertFrei = 2;
const wertReserve = -1;

@Injectable()
export class FairnessService {

  constructor() { }

  public getDurchschnitt(fairnessIndikatoren: Array<number>): number {
    var sum = 0;
    for(var i = 0; i < fairnessIndikatoren.length; i++) {
      sum += fairnessIndikatoren[i];
    }
    return sum / fairnessIndikatoren.length;
  }

  // TODO: Umbenennen
  public getDurchschnittInProzent(min: number, max: number, durchschnitt: number): number {
    return (Math.abs(durchschnitt) / (Math.abs(max) + Math.abs(min))) * 100;
  }

  public getFairnessIndikatorPerson(zuteilung: string[]): number {
    if (!zuteilung || zuteilung.length <= 0) return;
    var fairness = 0;
    for (var i = 0; i < zuteilung.length; i++) {
      var dienstArt = zuteilung[i];
      var zwischenSum = 0;
      var anzDurchgaenge = 1;
      var feldWert = 0;
      if (zuteilung[i] === dienst) feldWert = wertDienst;
      if (zuteilung[i] === frei) feldWert = wertFrei;
      if (zuteilung[i] === reserve) feldWert = wertReserve;
      while (i < zuteilung.length && dienstArt === zuteilung[i]) {
        zwischenSum += (anzDurchgaenge * feldWert);
        i++;
        anzDurchgaenge += 1;
      }
      i--;
      fairness += zwischenSum;
    }
    return fairness;
  }
}
