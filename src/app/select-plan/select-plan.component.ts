import { Component, OnInit } from '@angular/core';
import {SentinelDataService} from "../sentinel-data.service";
import {Sentinel} from "../../Sentinel";
import {ModesGeneratorService} from "../modes-generator.service";
import {PlanGeneratorService} from "../plan-generator.service";
import {Mode} from "../../Mode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plan-auswaehlen',
  templateUrl: 'select-plan.component.html',
  styleUrls: ['select-plan.component.css'],
  providers: [
    PlanGeneratorService
  ]
})
// Stellt die Übersicht der verschieden generierten Pläne dar
export class SelectPlanComponent implements OnInit {
  private _sentinel: Sentinel;
  public show: boolean = false;

  constructor(
    public modesService: ModesGeneratorService,
    private sentinelData: SentinelDataService
  ) { }

  ngOnInit() {
    if (this.sentinelData.sentinel) {
      this.show = true;
      this._sentinel = this.sentinelData.sentinel;
    }
  }

  get sentinel(): Sentinel {
    return this._sentinel;
  }
}
