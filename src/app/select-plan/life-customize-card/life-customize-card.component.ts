import {Component, OnInit, OnChanges} from '@angular/core';
import {SentinelDataService} from "../../sentinel-data.service";
import {Plan} from "../../../Plan";
import {ModesGeneratorService} from "../../modes-generator.service";
import {Mode} from "../../../Mode";
import {PlanGeneratorService} from "../../plan-generator.service";

@Component({
  selector: 'app-life-customize-card',
  templateUrl: './life-customize-card.component.html',
  styleUrls: ['./life-customize-card.component.css']
})
export class LifeCustomizeCardComponent implements OnInit {
  public sliderBlockLength = 1;
  public sliderBlockHeight = 1;
  public customizedPlan: Plan;
  private customizedMode: Mode;

  constructor(
    private sentinelData: SentinelDataService,
    private planGenerator: PlanGeneratorService
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.customizedMode = new Mode('Selber erstellter Plan', this.sliderBlockLength, this.sliderBlockHeight);
    // TODO: Was geschieht, wenn der eine Plan noch am generieren ist, der zweite jedoch bereits abgeschickt wurde?
    this.planGenerator.startGeneratingPlan(this.customizedMode, this.sentinelData.sentinel.getDurationInHours(), this.sentinelData.sentinel.guards)
      .then((response) => {
        this.customizedPlan = response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public getMaxBlockWidth(): number {
    return this.sentinelData.sentinel.getDurationInHours();
  }

  public getMaxBlockHeight(): number {
    return this.sentinelData.sentinel.guards.length;
  }

}
