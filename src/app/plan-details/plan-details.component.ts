import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Plan} from "../../Plan";
import {WachtDataService} from "../wacht-data.service";
import 'rxjs/add/operator/switchMap';
import {Observable} from "rxjs";

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  private _selectedPlan: Plan;
  private stream: any;
  private fieldChanger: any = null;

  get selectedPlan(): Plan {
    return this._selectedPlan;
  }

  public getFieldClass(field: string): string {
    if (field === 'd') return 'red';
    if (field === 'r') return 'yellow';
    return 'green';
  }

  private changeFields(field1: {x: number, y: number}, selectedPlan: Plan): Object { // TypeScript ermöglicht mir nicht, die Curry funktion nur mit einem Param aufzurufen
    var field1 = field1;
    var selectedPlan = selectedPlan;
    return function (field2: {x: number, y: number}): Plan {
      var field2 = field2;
      var temp = selectedPlan.zuteilung[field1.y].zuteilung[field1.x];
      selectedPlan.zuteilung[field1.y].zuteilung[field1.x] = selectedPlan.zuteilung[field2.y].zuteilung[field2.x];
      selectedPlan.zuteilung[field2.y].zuteilung[field2.x] = temp;
      return selectedPlan;
    }
  }

  // TODO: Klone Plan-Objekt bevor es mutiert wird
  public fieldClicked(posX: number, posY: number) {
    if (this.fieldChanger) {
      this._selectedPlan = this.fieldChanger({x: posX, y: posY});
      this.fieldChanger = null;
      return;
    }
    this.fieldChanger = this.changeFields({x: posX, y: posY}, this._selectedPlan);
  }

  constructor(
    private router: Router,
    private dataService: WachtDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stream = this.activatedRoute.params.subscribe((params) => this._selectedPlan = this.dataService.getPlan(+params['selected']));
    console.log(this._selectedPlan);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

}
