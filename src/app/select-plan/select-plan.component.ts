import { Component, OnInit } from '@angular/core';
import {SentinelDataService} from "../sentinel-data.service";
import {Sentinel} from "../../Sentinel";
import {FairnessService} from "../fairness.service";
import {ModesGeneratorService} from "../modes-generator.service";
import {PlanGeneratorService} from "../plan-generator.service";
import {Mode} from "../../Mode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plan-auswaehlen',
  templateUrl: 'select-plan.component.html',
  styleUrls: ['select-plan.component.css'],
  providers: [
    FairnessService,
    PlanGeneratorService,
    ModesGeneratorService
  ]
})
// TODO: Observable einbauen, das auf sentinelDataService.resetSentinelData() hört und die lokalen Variablen neu zuweist
// Stellt die Übersicht der verschieden generierten Pläne dar
export class SelectPlanComponent implements OnInit {
  private _sentinel: Sentinel;
  private _modes: Mode[];
  public show: boolean;

  constructor(
    private sentinelData: SentinelDataService,
    private modesService: ModesGeneratorService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.sentinelData.sentinel) {
      this._sentinel = this.sentinelData.sentinel;
      this._modes = this.modesService.getModes();
    }
  }

  public select(mode: Mode) {
    console.log(this.sentinel);
    this.router.navigate(['/konfigurieren', this.modesService.getModes().indexOf(mode)]);
  }

  get sentinel(): Sentinel {
    return this._sentinel;
  }

  get modes(): Mode[] {
    return this._modes;
  }







}
