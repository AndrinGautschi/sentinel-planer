// Beschreibt einen Modus, wie ein Plan zu vergeben ist
export class Mode {
  constructor(
    private _title: string,
    private _xAxis: number,
    private _yAxis: number
  ) {  }

  get title(): string {
    return this._title;
  }

  get xAxis(): number {
    return this._xAxis;
  }

  get yAxis(): number {
    return this._yAxis;
  }

  public isValid(): boolean {
    return this._title && this._xAxis && this._yAxis ? true : false;
  }
}
