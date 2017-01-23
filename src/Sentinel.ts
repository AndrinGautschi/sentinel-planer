/**
 * Created by Andrin on 13.01.2017.
 */
import {Person} from "./Person";
import {Plan} from "./Plan";

export class Sentinel {
  constructor(
    private _commander: Person,
    private _deputy: Person,
    private _datefrom: Date,
    private _dateto: Date,
    private _guards: Person[]
  ) {
    // Da der Date/Time-Picker einen String liefert, muss vorsichtshalber der Wert in ein valides Date geparst werden
    this._datefrom = new Date(Date.parse(this._datefrom.toString()));
    this._dateto = new Date(Date.parse(this._dateto.toString()));
  }

  public getDurationInHours(): number { // TODO: Tests: Überprüfen, ob korrekte Zahl an Stunden herausgegeben wird
    return Math.round((this._dateto.valueOf() - this._datefrom.valueOf()) / 1000 / 60 / 60);
  }

  get guards(): Person[] {
    return this._guards;
  }

  get commander(): Person {
    return this._commander;
  }

  get deputy(): Person {
    return this._deputy;
  }

  get datefrom(): Date {
    return this._datefrom;
  }

  get dateto(): Date {
    return this._dateto;
  }
}
