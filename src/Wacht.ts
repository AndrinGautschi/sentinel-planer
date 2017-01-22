/**
 * Created by Andrin on 13.01.2017.
 */
import {Person} from "./Person";
import {Plan} from "./Plan";

export class Wacht {
  get personen(): Person[] {
    return this._personen;
  }
  get kdt(): Person {
    return this._kdt;
  }

  get stv(): Person {
    return this._stv;
  }

  get datefrom(): Date {
    return this._datefrom;
  }

  get dateto(): Date {
    return this._dateto;
  }

  // TODO: Überprüfen, ob korrekte Zahl an Stunden herausgegeben wird
  public getDauerInStunden(): number {
    return Math.round((this._dateto.valueOf() - this._datefrom.valueOf()) / 1000 / 60 / 60);
  }

  constructor(
    private _kdt: Person,
    private _stv: Person,
    private _datefrom: Date,
    private _dateto: Date,
    private _personen: Person[]
  ) {
    // Da der Inder-Date/Time-Picker eine String liefert, muss vorsichtshalber der Wert in ein valides Date geparst werden
    this._datefrom = new Date(Date.parse(this._datefrom.toString()));
    this._dateto = new Date(Date.parse(this._dateto.toString()));
  }
}
