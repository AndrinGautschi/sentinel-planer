import {Component, OnInit, Input, Optional} from '@angular/core';
import {Mode} from "../../../Mode";
import {Person} from "../../../Person";
import {PlanGeneratorService} from "../../plan-generator.service";
import {Plan} from "../../../Plan";
import {SentinelDataService} from "../../sentinel-data.service";
import {Router} from "@angular/router";
import {ModesGeneratorService} from "../../modes-generator.service";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-plan-card',
  templateUrl: 'plan-card.component.html',
  styleUrls: ['plan-card.component.css']
})
// Verwaltet die zusammenfassende Ansicht für einen Plan
export class PlanCardComponent implements OnInit {
  @Input() mode: Mode;
  @Input() persons: Person[];
  @Input() duration: number;
  @Input() @Optional() initializedPlan: Plan; // für den Fall, dass an anderer Stelle bereits ein Plan generiert wurde
                                              // und nur noch mitgegeben werden kann.

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
    if (!this.initializedPlan) { // wenn kein Plan übergeben, produziert selber einen
      if (!this.mode.isValid() || this.persons.length <= 0 || this.duration <= 0) return; // TODO: Throw Error
      this.planGenerator.startGeneratingPlan(this.mode, this.duration, this.persons)
        .then((response) => {
          this.sentinelData.addPlan(response);
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
