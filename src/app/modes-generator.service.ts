import { Injectable } from '@angular/core';
import {Mode} from "../Mode";

@Injectable()
export class ModesGeneratorService { // TODO: Renaming in ModesService
  private _modes: Mode[];

  constructor() {
    this._modes = [  // TODO: Auslagern in seperates File
      new Mode("4x 4y",4,4),
      new Mode("4x 2y",4,2),
      new Mode("8x 4y",8,4),
      new Mode("2x 4y",2,4),
      new Mode("2x 2y",2,2),
      new Mode("1x 4y",1,4),
      new Mode("1x 2y",1,2)
    ];
  }

  public getModes(): Mode[] {
    return this._modes;
  }

  public addMode(mode: Mode): void {
    this._modes.push(mode);
  }

}
