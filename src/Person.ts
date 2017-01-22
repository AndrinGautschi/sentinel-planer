/**
 * Created by Andrin on 13.01.2017.
 */
export class Person {
  get name(): string {
    return this._name;
  }

  constructor (
    private _name: string
  ) { }
}
