import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Plan} from "../../Plan";
import {SentinelDataService} from "../sentinel-data.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-selected-plan-details',
  templateUrl: 'selected-plan-details.component.html',
  styleUrls: ['selected-plan-details.component.css']
})
export class SelectedPlanDetailsComponent implements OnInit, OnDestroy {
  private _selectedPlan: Plan;
  private _stream: any;
  private _fieldChanger: any = null;
  private _selectedPlanIndex: number;

  constructor(
    private sentinelData: SentinelDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this._stream = this.activatedRoute.params.subscribe((params) => {
      this._selectedPlanIndex = +params['selected'];
      this._selectedPlan = this.sentinelData.getPlanByIndex(this._selectedPlanIndex);
    });
  }

  ngOnDestroy() {
    this._stream.unsubscribe();
  }

  public getFieldClass(field: string): string {
    if (field === 'd') return 'red'; // TODO: Anbindung Field-Type-Service
    if (field === 'r') return 'yellow';
    return 'green';
  }

  // TODO: Klone Plan-Objekt bevor es mutiert wird
  public fieldClicked(posX: number, posY: number) {
    if (this._fieldChanger) { // Wenn das zweite Feld geklickt wurde, sollte die Curry-Funktion genutzt werden
      this._selectedPlan = this._fieldChanger({x: posX, y: posY});
      this._fieldChanger = null;
      return;
    }
    this._fieldChanger = this.changeFields({x: posX, y: posY}, this._selectedPlan);
  }

  public next(): void {
    this.router.navigate(['/drucken', this._selectedPlanIndex]);
  }

  private changeFields(field1: {x: number, y: number}, selectedPlan: Plan): Object { // TypeScript ermöglicht mir nicht, die Curry funktion nur mit einem Param aufzurufen
    var field1 = field1;
    var selectedPlan = selectedPlan;
    return function (field2: {x: number, y: number}): Plan {
      var field2 = field2;
      var temp = selectedPlan.allocations[field1.y].allocation[field1.x];
      selectedPlan.allocations[field1.y].allocation[field1.x] = selectedPlan.allocations[field2.y].allocation[field2.x];
      selectedPlan.allocations[field2.y].allocation[field2.x] = temp;
      return selectedPlan;
    }
  }

  get selectedPlan(): Plan {
    return this._selectedPlan;
  }
}
