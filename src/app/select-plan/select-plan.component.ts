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
export class PlanAuswaehlenComponent implements OnInit {
  get wacht(): Sentinel {
    return this._wacht;
  }

  get modi(): Mode[] {
    return this._modi;
  }

  private _wacht: Sentinel;
  private _modi: Mode[];

  constructor(
    private wachtDataService: WachtDataService,
    private generatorModi: GeneratorModiService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.wachtDataService.wacht) {
      this._wacht = this.wachtDataService.wacht;
      this._modi = this.generatorModi.getModi();
    }
  }

  public konfigurieren(modus: Mode) {
    console.log(this.wacht);
    this.router.navigate(['/konfigurieren', this.modi.indexOf(modus)]);
  }
}
