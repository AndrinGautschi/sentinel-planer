import {Person} from "./Person";
/**
 * Created by Andrin on 16.01.2017.
 */
export class Zuteilung {
  get zuteilung(): string[] {
    return this._zuteilung;
  }

  get person(): Person {
    return this._person;
  }

  public isValid(): boolean {
    if (this.zuteilung.length < 0 || !this.person) return false;
    return true;
  }

  constructor(
    private _zuteilung: string[],
    private _person: Person
  ) { }
}
