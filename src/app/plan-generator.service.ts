import { Injectable } from '@angular/core';
import {Plan} from "../Plan";
import {Modus} from "../Modus";
import {Person} from "../Person";
import {Allocation} from "../Allocation";
import {forEach} from "@angular/router/src/utils/collection";
import any = jasmine.any;

const dienst = 'd';
const reserve = 'r';
const frei = undefined;
const blockStandardHoehe = 4; // Jede Dienstgruppe muss durch eine Reservegruppe abgesichert sein.
const anzBeschaeftigterProDienstart = 2; // Es sind pro aktive Aufgabe (Dienst oder Reserve) immer zwei Leute zu beschäftigen.

@Injectable()
export class PlanGeneratorService {

  // Dies ist eine von GitHub kopierte Funktion zur Erstellung mehrdimensionaler Arrays.
  private createArray(length: number, lengthInner: number): Array<String> { // Workaround mit zweitem Parameter, da TypeScript nicht eine beliebige Anz Param zulässt.
    var arr = new Array(length || 0),
      i = length;
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = this.createArray.apply(this, args);
    }
    return arr;
  }

  // Prüft den für die Arbeit benötigten zweidimensionalen Array auf Korrektheit.
  private isArrayValid(array): boolean {
    if (!(array instanceof Array) || array.length <= 0 || !(array[0] instanceof Array) || array[0].length <= 0) return false;
    return true;
  }

  // Evaluiert anhand der Umgebungsfelder, welche Dienstart zu wählen ist.
  private getDienstArt(array, xAchsePos: number, yAchsePos: number): string {
    //TODO: Die Verteilung (dienst oder reserve) sollte auch davon abhängig sein, was die Person in der letzten Schicht getan hat
    // Prüfung der Paramter
    var exitNow = !this.isArrayValid(array);
        exitNow = exitNow || xAchsePos < 0 || xAchsePos >= array.length ? true : false;
        exitNow = exitNow || yAchsePos < 0 || yAchsePos >= array[0].length ? true : false;
    if (exitNow) return;

    // Deklaration der Hilfsmethoden
    const einsOberhalb = function (array, xPos, yPos) {
      var yPosEinsOberhalb = yPos - 1 < 0 ? array[xPos].length - 1 : yPos - 1; // prüfe, ob ausserhalb des Arrays
      return array[xPos][yPosEinsOberhalb];
    }
    const zweiOberhalb = function (array, xPos, yPos) {
      var yPosZweiOberhalb = yPos - 2 < 0 ? array[xPos].length - Math.abs(yPos - 2) : yPos - 2; // prüfe, ob ausserhalb des Arrays
      return array[xPos][yPosZweiOberhalb];
    }

    if (einsOberhalb(array, xAchsePos, yAchsePos) === zweiOberhalb(array, xAchsePos, yAchsePos)) {
      return einsOberhalb(array, xAchsePos, yAchsePos) === frei ? dienst : reserve;
    } else {
      return einsOberhalb(array, xAchsePos, yAchsePos);
    }
  }

  // Erhält den Einteilungsarray, die linke obere Ecke des einzuteilenden Blockes und die Blockgrösse.
  // Beurteilt danach, ob es einen Umbruch (unteres/rechtes Ende des Einteilungsarrays) geben wird.
  // Beschreibt den Einteilungsarray gemäss den Erkenntnissen.
  private setzBlock(array, startXAchse: number, startYAchse: number, blockWeite: number, blockHoehe: number): Array<String> {
    // Prüfung der Paramter
    var exitNow = !this.isArrayValid(array);
        exitNow = exitNow || startXAchse < 0 || startXAchse >= array.length ? true : false;
        exitNow = exitNow || startYAchse < 0 || startYAchse >= array[0].length ? true : false;
        exitNow = exitNow || blockWeite <= 0 || blockWeite >= array.length ? true : false;
        exitNow = exitNow || blockHoehe <= 0 || blockHoehe >= array[0].length ? true : false;
    if (exitNow) return;

    // Logische Prüfung (Überlappung)
    var xFelderBisEnde = startXAchse + blockWeite > array.length ? array.length - startXAchse : 0;
    var yFelderBisEnde = startYAchse + blockHoehe > array[0].length ? array[0].length - startYAchse : 0;


    if (!xFelderBisEnde && !yFelderBisEnde) {
      // Geht Reihe für Reihe durch und vergibt
      for (var y = 0; y < blockHoehe; y++) { // Arbeitet sich X-Achse für X-Achse nach unten
        for (var x = 0; x < blockWeite; x++) {
          array[startXAchse + x][startYAchse + y] = this.getDienstArt(array, startXAchse + x, startYAchse + y);
        }
      }
    } else {
      var xAchseUeberlappung: number = startXAchse + blockWeite > array.length ? (startXAchse + blockWeite) - array.length : 0;
      var yAchseUeberlappung: number = startYAchse + blockHoehe > array[0].length ? (startYAchse + blockHoehe) - array[0].length : 0;

      // Wenn eine Überlappung gefunden wurde, müssen zuerst die restlichen Felder bis Ende y-Achse vergeben werden
      array = this.setzBlock.apply(this, [array, startXAchse, startYAchse, blockWeite - xAchseUeberlappung, blockHoehe - yAchseUeberlappung]);

      // Danach vergeben wir die restlichen Felder
      array = this.setzBlock.apply(this, [array, startXAchse, 0, blockWeite - xAchseUeberlappung, yAchseUeberlappung]);
    }
    return array;
  }

  // Erstellt ein Plan-Objekt und gibt dieses zurück
  private erstellePlanObj(zuteilungsArray, modus: Modus, personen: Person[]): Plan {
    // Paramter Prüfung
    var exitNow = !this.isArrayValid(zuteilungsArray) ? true : false;
        exitNow = exitNow || zuteilungsArray[0].length !== personen.length ? true: false;
        exitNow = exitNow || !modus.validModi() ? true : false;
    if (exitNow) return;

    var zuteilungen = Array<Allocation>();
    for (var index = 0; index < personen.length; index++) {
      var personZuteilung = Array<string>();
      for(var stundenIndenx = 0; stundenIndenx < zuteilungsArray.length; stundenIndenx++) {
        personZuteilung.push(zuteilungsArray[stundenIndenx][index]);
      }
      zuteilungen.push(new Allocation(personZuteilung, personen[index]));
    }
    return new Plan(modus.title, modus, zuteilungen);
  }

  // "main" Methode, die das Erstellen eines Planes koordiniert und abwickelt.
  private generatePlan(modus: Modus, laengeXAchse: number, laengeYAchse: Person[]): Plan {
    var array = this.createArray(laengeXAchse, laengeYAchse.length);

    // Prüfungen
    var exitNow = !this.isArrayValid(array) ? true : false;
        exitNow = exitNow || !modus.validModi() ? true : false;
        exitNow = exitNow || laengeYAchse.length <= 0 ? true : false;
        exitNow = exitNow || laengeXAchse <= 0 ? true : false;
    if (exitNow) return;

    var yPos = 0;
    var xPos = 0;
    while (xPos < laengeXAchse) {
      if (yPos  >= laengeYAchse.length) yPos -= laengeYAchse.length;
      array = this.setzBlock(array, xPos, yPos, modus.xAchse, blockStandardHoehe);
      xPos += modus.xAchse;
      yPos += modus.yAchse;
    }
    if (!array) return;

    return this.erstellePlanObj(array, modus, laengeYAchse);
  }

  // Eine von aussen ansteuerbare Methode, die eine Promise zurückgibt, welche resolved wird, sobald der Plan generiert wurde oder rejected, wenn die Verarbeitung fehlgeschlagen ist.
  public getPlan(modus: Modus, dauer: number, personen: Person[]): Promise<Plan> {
    return new Promise((resolve, reject) => {
      var plan: Plan = this.generatePlan(modus, dauer, personen);

      // Prüfung nach der Verarbeitung
      if (plan) { // Plan abgefüllt === Verarbeitung ohne Fehler
        resolve(plan);
      } else {
        reject("In der Verarbeitung ist ein schwerwiegender Fehler aufgetreten!");
      }
    });
  }

  constructor() { }
}
