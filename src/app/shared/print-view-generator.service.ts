import { Injectable } from '@angular/core';
import {Plan} from "../../Plan";
import {Sentinel} from "../../Sentinel";
import {CONSTANTS} from "./util/constants";

@Injectable()
export class PrintViewGeneratorService {

  constructor() { }

  public startGeneratingPrintView(plan: Plan, sentinel: Sentinel): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      try {
        var sheets = this.generatePrintView(plan, sentinel);
        resolve(sheets);
      } catch (err) {
        reject(err || "Something went wrong"); // TODO: Exception Handling
      }
    });
  }

  private generatePrintView(plan: Plan, sentinel: Sentinel): any {
    // TODO: Paramprüfungen
    var startPoint = sentinel.datefrom.getHours() - CONSTANTS.printSheetShift < 0 ?
      (sentinel.datefrom.getHours() + CONSTANTS.printSheetLength) - CONSTANTS.printSheetShift :
      (sentinel.datefrom.getHours() - CONSTANTS.printSheetShift);
    var numberOfSheets = Math.ceil(sentinel.getDurationInHours() / CONSTANTS.printSheetLength);
    if (startPoint !== 0) numberOfSheets++;
    var hourPosInPlan = 0;
    var returnArray = new Array();
    for (var sheetIndex = 0; sheetIndex < numberOfSheets; sheetIndex++) {
      var sheet = new Array(CONSTANTS.printSheetLength);
      for (var hour = startPoint; hour < CONSTANTS.printSheetLength && hourPosInPlan < plan.allocations[0].allocation.length; hour++, hourPosInPlan++) {
        sheet[hour] = this.getAllocationsByHour(plan, hourPosInPlan);
      }
      startPoint = 0;
      returnArray.push(sheet);
    }
    return returnArray;
  }

  private getAllocationsByHour(plan: Plan, hour): Array<string> {
    var returnArray = Array<string>();
    for (var i = 0; i < plan.allocations.length; i++) {
      returnArray.push(plan.allocations[i].allocation[hour]);
    }
    return returnArray;
  }
}
