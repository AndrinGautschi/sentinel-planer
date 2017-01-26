import {Component, OnInit, Input, Optional} from '@angular/core';
import {Mode} from "../../../Mode";
import {Person} from "../../../Person";
import {FairnessService} from "../../fairness.service";
import {PlanGeneratorService} from "../../plan-generator.service";
import {Plan} from "../../../Plan";
import {SentinelDataService} from "../../sentinel-data.service";

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
  public viewModel: PlanCardViewModel;

  constructor(
    private fairness: FairnessService,
    private planGenerator: PlanGeneratorService,
    private sentinelData: SentinelDataService
  ) { }

  ngOnInit() {
    if (!this.initializedPlan) { // wenn kein Plan übergeben, produziert selber einen
      if (!this.mode.isValid() || this.persons.length <= 0 || this.duration <= 0) return;
      this.planGenerator.startGeneratingPlan(this.mode, this.duration, this.persons)
        .then((response) => {
          console.log(response);
          this.viewModel = this.getPlanCardViewModel(response);
          console.log(this.viewModel);
          this.sentinelData.addPlan(response);
          this.loading = false;
        })
        .catch((exception) => {
          console.log(exception);
          this.failure = {isFehler: true, exception: exception}; // TODO: Fehlerausgabe auf View
          this.loading = false;
        });
    }
  }

  public getPlanCardViewModel(plan: Plan): PlanCardViewModel {
    var personsScore = this.fairness.getPersonsScoreInProcent(plan);
    var planScore = this.fairness.getPlanScoreInProcent(personsScore);

    return {
      title: plan.title,
      score: planScore,
      persons: personsScore
    };
  }
}

export interface PlanCardViewModel {
  title: string;
  score: number; // Wertung des Planes in Prozent
  persons: Array<{
    person: Person,
    score: number // Wertung der Person in Prozent
  }>;
}
