import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SentinelDataService} from "../sentinel-data.service";
import {Plan} from "../../Plan";
import {PrintViewGeneratorService} from "../print-view-generator.service";

@Component({
  selector: 'app-plan-print-view',
  templateUrl: './plan-print-view.component.html',
  styleUrls: ['./plan-print-view.component.css']
})
export class PlanPrintViewComponent implements OnInit, OnDestroy {
  public printSheets;
  private _stream;
  private _selectedPlan: Plan;

  constructor(
    private sentinelData: SentinelDataService,
    private activatedRoute: ActivatedRoute,
    private printViewGenerator: PrintViewGeneratorService
  ) { }

  ngOnInit() {
    this._stream = this.activatedRoute.params.subscribe((params) => this._selectedPlan = this.sentinelData.getPlanByIndex(+params['selected']));
    this.printViewGenerator.startGeneratingPrintView(this._selectedPlan, this.sentinelData.sentinel)
      .then((response) => {
        this.printSheets = response;
        console.log(response);
      })
      .catch((exception) => {
        console.log(exception);
      });
  }

  ngOnDestroy() {
    this._stream.unsubscribe();
  }

  public getName(index): string {
    if (typeof index === 'string') {
      if (index === 'commander') return this.sentinelData.sentinel.commander.name;
      if (index === 'deputy') return this.sentinelData.sentinel.deputy.name;
    }
    
    return 'No Name';
  }

}
