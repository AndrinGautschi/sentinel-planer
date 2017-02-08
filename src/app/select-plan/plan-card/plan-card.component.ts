import {Component, OnInit, Input} from '@angular/core';
import {Mode} from "../../../Mode";
import {Person} from "../../../Person";
import {PlanGeneratorService} from "../../plan-generator.service";
import {Plan} from "../../../Plan";
import {SentinelDataService} from "../../sentinel-data.service";
import {Router} from "@angular/router";
import {ModesGeneratorService} from "../../modes-generator.service";

@Component({
  selector: 'app-plan-card',
  templateUrl: 'plan-card.component.html',
  styleUrls: ['plan-card.component.css',
              '../select-plan.component.css']
})
// Verwaltet die zusammenfassende Ansicht für einen Plan
export class PlanCardComponent implements OnInit {
  @Input() mode: Mode;
  @Input() persons: Person[];
  @Input() duration: number;

  public loading: boolean = true;
  public failure: {isFehler: boolean, exception: string} = {isFehler: false, exception: ''};
  public localPlan: Plan;

  constructor(
    private planGenerator: PlanGeneratorService,
    private sentinelData: SentinelDataService,
    private router: Router,
    private modesService: ModesGeneratorService
  ) { }

  ngOnInit() {
    if (this.sentinelData.plansAreGenerated[this.modesService.getModes().indexOf(this.mode)]) {
      this.localPlan = this.sentinelData.getPlanByIndex(this.modesService.getModes().indexOf(this.mode));
      this.loading = false;
    } else {
      if (!this.mode.isValid() || this.persons.length <= 0 || this.duration <= 0) return; // TODO: Throw Error
      this.planGenerator.startGeneratingPlan(this.mode, this.duration, this.persons) // TODO: Renaming persons to guards
        .then((response) => {
          this.sentinelData.addPlan(response);
          this.sentinelData.setPlansAreGenerated(this.modesService.getModes().indexOf(this.mode), true); // sollte der Nutzer einen Plan auswählen und zurück gehen,
                                                                                                         // müssen die Pläne neu initialisiert werden.
          this.localPlan = response;
          this.loading = false;
        })
        .catch((exception) => {
          this.failure = {isFehler: true, exception: exception}; // TODO: Fehlerausgabe auf View
          this.loading = false;
        });
    }
  }

  public select(): void {
    this.router.navigate(['/konfigurieren', this.modesService.getModes().indexOf(this.mode)]);
  }
}
