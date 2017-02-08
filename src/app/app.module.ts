import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { MaterialModule } from '@angular/material'; // standard Material Library
import { Md2Module } from 'md2'; // für Date-/Timepicker

import { AppComponent } from './app.component';

import { SentinelDataService } from './sentinel-data.service';
import { SentinelDataInputComponent } from './sentinel-data-input/sentinel-data-input.component';
import { SelectPlanComponent } from './select-plan/select-plan.component';
import { PlanCardComponent } from './select-plan/plan-card/plan-card.component';
import { SelectedPlanDetailsComponent } from './selected-plan-details/selected-plan-details.component';
import {ConstantsService} from "./constants.service";
import { LifeCustomizeCardComponent } from './select-plan/life-customize-card/life-customize-card.component';
import {ModesGeneratorService} from "./modes-generator.service";
import { PlanPrintViewComponent } from './plan-print-view/plan-print-view.component';
import {PrintViewGeneratorService} from "./print-view-generator.service";
import {FlexLayoutModule} from "@angular/flex-layout";

const appRoutes: Routes = [ //TODO: Auslagern in seperates File
  { path: 'daten', component: SentinelDataInputComponent },
  { path: 'auswaehlen', component: SelectPlanComponent },
  { path: 'konfigurieren/:selected', component: SelectedPlanDetailsComponent },
  { path: 'drucken/:selected', component: PlanPrintViewComponent },
  { path: '', redirectTo: 'daten', pathMatch: 'full'}, // wenn kein PATH eingegeben
  { path: '**', redirectTo: 'daten'} // wenn unbekannten PATH eingegeben
]

// TODO: Prüfe, wo 'static' Methoden verwendet werden könnten und verwende diese
// TODO: Prüfen, ob 'let' anstelle von 'var'
// TODO: Error Handling Einbauen mit 'throw' und 'catch'
@NgModule({
  declarations: [
    AppComponent,
    SentinelDataInputComponent,
    SelectPlanComponent,
    PlanCardComponent,
    SelectedPlanDetailsComponent,
    LifeCustomizeCardComponent,
    PlanPrintViewComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    SentinelDataService,
    ConstantsService,
    ModesGeneratorService,
    PrintViewGeneratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
