import { Injectable } from '@angular/core';
import {Mode} from "../Mode";

@Injectable()
export class GeneratorModiService {
  private modi: Mode[];

  constructor() {
    this.modi = [
      new Mode("4x 4y",4,4),
      new Mode("4x 2y",4,2),
      new Mode("8x 4y",8,4),
      new Mode("2x 4y",2,4),
      new Mode("2x 2y",2,2),
      new Mode("1x 4y",1,4),
      new Mode("1x 2y",1,2)
    ];
  }

  public getModi(): Mode[] {
    return this.modi;
  }

}
