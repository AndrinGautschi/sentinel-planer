import { Component, OnInit } from '@angular/core';
import {WachtDataService} from "../wacht-data.service";
import {Sentinel} from "../../Sentinel";
import {FairnessService} from "../fairness.service";
import {GeneratorModiService} from "../generator-modi.service";
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
    GeneratorModiService
  ]
})
// TODO: Observable einbauen, das auf sentinelDataService.reset() hört und die lokalen Variablen neu zuweist
// Stellt die Übersicht der verschieden generierten Pläne dar
export class SelectPlanComponent implements OnInit {
  private _sentinel: Sentinel;
  private _modes: Mode[];

  constructor(
    private sentinelData: WachtDataService,
    private modesService: GeneratorModiService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.sentinelData.wacht) {
      this._sentinel = this.sentinelData.wacht;
      this._modes = this.modesService.getModi();
    }
  }

  public select(mode: Mode) {
    console.log(this.sentinel);
    this.router.navigate(['/konfigurieren', this.modesService.getModi().indexOf(mode)]);
  }

  get sentinel(): Sentinel {
    return this._sentinel;
  }

  get modes(): Mode[] {
    return this._modes;
  }







}
