/**
 * Created by Andrin on 16.01.2017.
 */
export class Modus {
  get title(): string {
    return this._title;
  }

  get xAchse(): number {
    return this._xAchse;
  }

  get yAchse(): number {
    return this._yAchse;
  }

  public validModi(): boolean {
    return this._title && this._xAchse && this._yAchse ? true : false;
  }

  constructor(
    private _title: string,
    private _xAchse: number,
    private _yAchse: number
  ) {
    // Zuweisung zu lokalen Variablen geschieht automatisch in der Parameterübergabe
  }
}
