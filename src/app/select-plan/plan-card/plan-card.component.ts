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
  styleUrls: ['plan-card.component.css'],
  providers: [
    FairnessService,
    PlanGeneratorService
  ]
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
    private fairnessGenerator: FairnessService,
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

  private getPlanCardViewModel(plan: Plan): PlanCardViewModel {
    var personsScore = new Array<number>();
    var persons = new Array<{name: string, score: number}>();

    for (var i = 0; i < plan.allocation.length; i++) {
      personsScore.push(this.fairnessGenerator.calculateFairness(plan.allocation[i].allcation));
    }

    var max_value = Math.max.apply(this, personsScore);
    var min_value = Math.min.apply(this, personsScore);

    if (personsScore.length === plan.allocation.length) {
      for (var index = 0; index < personsScore.length; index++) {
        persons.push({name: plan.allocation[index].person.name, score: this.fairnessGenerator.calculateProcentValue(min_value, max_value, personsScore[index])})
      }
    }

    return {
      title: plan.title,
      score: this.fairnessGenerator.calculateProcentValue(min_value, max_value, this.fairnessGenerator.getAverage(personsScore)) === 50
              ? 100 : this.fairnessGenerator.calculateProcentValue(min_value, max_value, this.fairnessGenerator.getAverage(personsScore)), // TODO: Logik hier überarbeiten!
      persons: persons
    };
  }
}

export interface PlanCardViewModel {
  title: string;
  score: number; // Wertung des Planes in Prozent
  persons: Array<{
    name: string,
    score: number // Wertung der Person in Prozent
  }>;
}
