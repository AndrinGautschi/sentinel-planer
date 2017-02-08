import {Component, OnInit} from '@angular/core';
import {SentinelDataService} from "../../shared/sentinel-data.service";
import {Mode} from "../../../Mode";
import {ModesGeneratorService} from "../../shared/modes-generator.service";

@Component({
  selector: 'app-life-customize-card',
  templateUrl: './life-customize-card.component.html',
  styleUrls: ['./life-customize-card.component.css',
              '../select-plan.component.css']
})
export class LifeCustomizeCardComponent implements OnInit {
  public selectedValueHeight;
  public selectedValueLength;

  constructor(
    private sentinelData: SentinelDataService,
    private modes: ModesGeneratorService
  ) { }

  ngOnInit() {

  }

  public generateNewPlan() {
    this.modes.addMode(new Mode('Custom Plan', this.selectedValueLength || 1, this.selectedValueHeight || 1));
  }

  public getSelectValuesBlockWidth(): Array<number> {
    return new Array<number>(this.sentinelData.sentinel.getDurationInHours());
  }

  public getSelectValuesBlockHeight(): Array<number> {
    return new Array<number>(this.sentinelData.sentinel.guards.length);
  }
}
