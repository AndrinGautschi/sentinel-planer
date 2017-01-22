import {Component, OnInit, Input, Optional} from '@angular/core';
import {Modus} from "../../Modus";
import {Person} from "../../Person";
import {FairnessService} from "../fairness.service";
import {PlanGeneratorService} from "../plan-generator.service";
import {Plan} from "../../Plan";
import {log} from "util";
import {Zuteilung} from "../../Zuteilung";
import {WachtDataService} from "../wacht-data.service";

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css'],
  providers: [
    FairnessService,
    PlanGeneratorService
  ]
})
export class PlanCardComponent implements OnInit {
  @Input() modus: Modus;
  @Input() personen: Person[];
  @Input() dauer: number;
  // für den Fall, dass an anderer Stelle bereits ein Plan generiert wurde und nur noch mitgegeben werden kann.
  @Input() @Optional() erstellterPlan: Plan;

  loading: boolean = true;
  fehler: {isFehler: boolean, fehlerMeldung: string} = {isFehler: false, fehlerMeldung: ''}; // zeigt Fehlermeldung
  anzeige: PlanCardAnzeige;

  constructor(
    private fairness: FairnessService,
    private generator: PlanGeneratorService,
    private dataService: WachtDataService
  ) { }

  private getPlanCardAnzeige(plan: Plan): PlanCardAnzeige {
    var personenWertung = new Array<number>();
    var personen = new Array<{name: string, wertung: number}>();

    for (var i = 0; i < plan.zuteilung.length; i++) {
      personenWertung.push(this.fairness.getFairnessIndikatorPerson(plan.zuteilung[i].zuteilung));
    }

    var max_value = Math.max.apply(this, personenWertung);
    var min_value = Math.min.apply(this, personenWertung);

    if (personenWertung.length === plan.zuteilung.length) {
      for (var index = 0; index < personenWertung.length; index++) {
        personen.push({name: plan.zuteilung[index].person.name, wertung: this.fairness.getDurchschnittInProzent(min_value, max_value, personenWertung[index])})
      }
    }

    return {
      title: plan.title,
      wertung: this.fairness.getDurchschnittInProzent(min_value, max_value, this.fairness.getDurchschnitt(personenWertung)),
      personen: personen
    };
  }

  ngOnInit() {
    if (!this.erstellterPlan) { // wenn kein Plan übergeben, produziert selber einen
      if (!this.modus.validModi() || this.personen.length <= 0 || this.dauer <= 0) return;
      this.generator.getPlan(this.modus, this.dauer, this.personen)
        .then((response) => {
          console.log(response);
          this.anzeige = this.getPlanCardAnzeige(response);
          console.log(this.anzeige);
          this.dataService.addPlan(response);
          this.loading = false;
        })
        .catch((exception) => {
          console.log(exception);
          this.fehler = {isFehler: true, fehlerMeldung: exception}; // TODO: Fehlerausgabe
          this.loading = false;
        });
    }

  }
}

export interface PlanCardAnzeige {
  title: string;
  wertung: number; // Wertung des Planes in Prozent
  personen: Array<{
    name: string,
    wertung: number // Wertung der Person in Prozent
  }>;
}
