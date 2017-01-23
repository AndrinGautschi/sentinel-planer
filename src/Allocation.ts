import {Person} from "./Person";

// Zuteilung einer Person
export class Allocation {
  constructor(
    private _allocation: string[],
    private _person: Person
  ) { }

  public isValid(): boolean {
    if (this.allcation.length < 0 || !this.person) return false;
    return true;
  }

  get allcation(): string[] {
    return this._allocation;
  }

  get person(): Person {
    return this._person;
  }

}
