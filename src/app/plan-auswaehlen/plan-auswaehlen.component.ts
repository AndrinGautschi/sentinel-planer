import { Component, OnInit } from '@angular/core';
import {WachtDataService} from "../wacht-data.service";
import {Wacht} from "../../Wacht";
import {FairnessService} from "../fairness.service";
import {GeneratorModiService} from "../generator-modi.service";
import {PlanGeneratorService} from "../plan-generator.service";
import {Modus} from "../../Modus";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plan-auswaehlen',
  templateUrl: './plan-auswaehlen.component.html',
  styleUrls: ['./plan-auswaehlen.component.css'],
  providers: [
    FairnessService,
    PlanGeneratorService,
    GeneratorModiService
  ]
})
// TODO: Observable einbauen, das auf sentinelDataService.reset() hört und die lokalen Variablen neu zuweist
export class PlanAuswaehlenComponent implements OnInit {
  get wacht(): Wacht {
    return this._wacht;
  }

  get modi(): Modus[] {
    return this._modi;
  }

  private _wacht: Wacht;
  private _modi: Modus[];

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

  public konfigurieren(modus: Modus) {
    console.log(this.wacht);
    this.router.navigate(['/konfigurieren', this.modi.indexOf(modus)]);
  }
}
