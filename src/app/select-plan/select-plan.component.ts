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
    PlanGeneratorService,
    ModesGeneratorService
  ]
})
// TODO: Observable einbauen, das auf sentinelDataService.resetSentinelData() hört und die lokalen Variablen neu zuweist
// Stellt die Übersicht der verschieden generierten Pläne dar
export class SelectPlanComponent implements OnInit {
  private _sentinel: Sentinel;
  private _modes: Mode[];
  public show: boolean = false;

  constructor(
    private sentinelData: SentinelDataService,
    private modesService: ModesGeneratorService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.sentinelData.sentinel) {
      this.show = true;
      this._sentinel = this.sentinelData.sentinel;
      this._modes = this.modesService.getModes();
    }
  }

  get sentinel(): Sentinel {
    return this._sentinel;
  }

  get modes(): Mode[] {
    return this._modes;
  }
}
