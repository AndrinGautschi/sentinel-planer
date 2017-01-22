import { Injectable } from '@angular/core';
import {Modus} from "../Modus";

@Injectable()
export class GeneratorModiService {
  private modi: Modus[];

  constructor() {
    this.modi = [
      new Modus("4x 4y",4,4),
      new Modus("4x 2y",4,2),
      new Modus("8x 4y",8,4),
      new Modus("2x 4y",2,4),
      new Modus("2x 2y",2,2),
      new Modus("1x 4y",1,4),
      new Modus("1x 2y",1,2)
    ];
  }

  public getModi(): Modus[] {
    return this.modi;
  }

}
