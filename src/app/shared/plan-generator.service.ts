import { Injectable } from '@angular/core';
import {Plan} from "../../Plan";
import {Mode} from "../../Mode";
import {Person} from "../../Person";
import {Allocation} from "../../Allocation";
import any = jasmine.any;

const duty = 'd'; // TODO: Service einbinden
const reserve = 'r';
const free = undefined;
const blockStandardHight = 4; // Jede Dienstgruppe muss durch eine Reservegruppe abgesichert sein.
const anzBeschaeftigterProDienstart = 2; // Es sind pro aktive Aufgabe (Dienst oder Reserve) immer zwei Leute zu beschäftigen.

@Injectable()
export class PlanGeneratorService {
  constructor() { }

  public startGeneratingPlan(mode: Mode, duration: number, persons: Person[]): Promise<Plan> {
    return new Promise((resolve, reject) => {
      var plan: Plan = this.generatePlan(mode, duration, persons);

      if (plan) { // Plan abgefüllt === Verarbeitung ohne Fehler
        resolve(plan);
      } else {
        reject("In der Verarbeitung ist ein schwerwiegender Fehler aufgetreten!");
      }
    });
  }

  // "main" Methode, die das Erstellen eines Planes koordiniert und abwickelt.
  private generatePlan(mode: Mode, lengthXAxis: number, lengthYAxis: Person[]): Plan {
    var array = this.createArray(lengthXAxis, lengthYAxis.length);

    var exitNow = !this.isArrayValid(array) ? true : false;
    exitNow = exitNow || !mode.isValid() ? true : false;
    exitNow = exitNow || lengthYAxis.length <= 0 ? true : false;
    exitNow = exitNow || lengthXAxis <= 0 ? true : false;
    if (exitNow) return;

    var yPos = 0;
    var xPos = 0;
    while (xPos < lengthXAxis) {
      if (yPos  >= lengthYAxis.length) yPos -= lengthYAxis.length;
      array = this.setBlockOnPosition(array, xPos, yPos, mode.xAxis, blockStandardHight);
      xPos += mode.xAxis;
      yPos += mode.yAxis;
    }
    if (!array) return;

    return this.createPlanObject(array, mode, lengthYAxis);
  }

  private setBlockOnPosition(array, startXAxis: number, startYAxis: number, blockWidth: number, blockHeight: number): Array<String> {
    var exitNow = !this.isArrayValid(array);
    exitNow = exitNow || startXAxis < 0 || startXAxis >= array.length ? true : false;
    exitNow = exitNow || startYAxis < 0 || startYAxis >= array[0].length ? true : false;
    exitNow = exitNow || blockWidth <= 0 ? true : false;
    exitNow = exitNow || blockHeight < 0 ? true : false;
    if (exitNow) return;

    // Logische Prüfung (Überlappung)
    var xAxisFieldsTillEndArray = startXAxis + blockWidth > array.length ? array.length - startXAxis : 0;
    var yAxisFieldsTillEndArray = startYAxis + blockHeight > array[0].length ? array[0].length - startYAxis : 0;


    if (!xAxisFieldsTillEndArray && !yAxisFieldsTillEndArray) {
      for (var y = 0; y < blockHeight; y++) { // Arbeitet sich Y-Achse für Y-Achse nach unten
        for (var x = 0; x < blockWidth; x++) {
          array[startXAxis + x][startYAxis + y] = this.getDutyTypeByContext(array, startXAxis + x, startYAxis + y);
        }
      }
    } else {
      var xAxisOverlayInFields: number = startXAxis + blockWidth > array.length ? (startXAxis + blockWidth) - array.length : 0;
      var yAxisOverlayInFields: number = startYAxis + blockHeight > array[0].length ? (startYAxis + blockHeight) - array[0].length : 0;

      // Wenn eine Überlappung gefunden wurde, müssen zuerst die restlichen Felder bis Ende y-Achse vergeben werden
      array = this.setBlockOnPosition.apply(this, [array, startXAxis, startYAxis, blockWidth - xAxisOverlayInFields, blockHeight - yAxisOverlayInFields]);

      // Danach vergeben wir die restlichen Felder
      array = this.setBlockOnPosition.apply(this, [array, startXAxis, 0, blockWidth - xAxisOverlayInFields, yAxisOverlayInFields]);
    }
    return array;
  }

  private getDutyTypeByContext(contextArray, xAxisPos: number, yAxisPos: number): string {
    //TODO: Die Verteilung (duty oder reserve) sollte auch davon abhängig sein, was die Person in der letzten Schicht getan hat
    var exitNow = !this.isArrayValid(contextArray);
    exitNow = exitNow || xAxisPos < 0 || xAxisPos >= contextArray.length ? true : false;
    exitNow = exitNow || yAxisPos < 0 || yAxisPos >= contextArray[0].length ? true : false;
    if (exitNow) return;

    // Deklaration der Hilfsmethoden
    const valueFieldOneAbove = function (array, xPos, yPos) {
      var yPosOneAbove = yPos - 1 < 0 ? array[xPos].length - 1 : yPos - 1; // greift er neben den Array, kommt er unten wieder raus
      return array[xPos][yPosOneAbove];
    }
    const valueFieldTwoAbove = function (array, xPos, yPos) {
      var yPosTwoAbove = yPos - 2 < 0 ? array[xPos].length - Math.abs(yPos - 2) : yPos - 2; // greift er neben den Array, kommt er unten wieder raus
      return array[xPos][yPosTwoAbove];
    }

    if (valueFieldOneAbove(contextArray, xAxisPos, yAxisPos) === valueFieldTwoAbove(contextArray, xAxisPos, yAxisPos)) {
      return valueFieldOneAbove(contextArray, xAxisPos, yAxisPos) === free ? duty : reserve;
    } else {
      return valueFieldOneAbove(contextArray, xAxisPos, yAxisPos);
    }
  }

  private createPlanObject(allocationsArray, mode: Mode, persons: Person[]): Plan {
    var exitNow = !this.isArrayValid(allocationsArray) ? true : false;
    exitNow = exitNow || allocationsArray[0].length !== persons.length ? true: false;
    exitNow = exitNow || !mode.isValid() ? true : false;
    if (exitNow) return;

    var allocations = Array<Allocation>();
    for (var index = 0; index < persons.length; index++) {
      var personAllocation = Array<string>();
      for(var hoursIndex = 0; hoursIndex < allocationsArray.length; hoursIndex++) {
        personAllocation.push(allocationsArray[hoursIndex][index]);
      }
      allocations.push(new Allocation(personAllocation, persons[index]));
    }
    return new Plan(mode.title, mode, allocations);
  }

  private isArrayValid(array): boolean {
    if (!(array instanceof Array) || array.length <= 0 || !(array[0] instanceof Array) || array[0].length <= 0) return false;
    return true;
  }

  // Dies ist eine von GitHub kopierte Funktion zur Erstellung mehrdimensionaler Arrays.  TODO: Auswechseln mit ArrayUtil.createArray()
  private createArray(length: number, lengthInner: number): Array<String> { // Workaround mit zweitem Parameter, da TypeScript nicht eine beliebige Anz Param zulässt.
    var arr = new Array(length || 0),
      i = length;
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = this.createArray.apply(this, args);
    }
    return arr;
  }
}
