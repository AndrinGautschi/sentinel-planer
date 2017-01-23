import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { MaterialModule } from '@angular/material'; // standard Material Library
import { Md2Module } from 'md2'; // für Date-/Timepicker

import { AppComponent } from './app.component';

import { WachtDataService } from './wacht-data.service';
import { SentinelDataInputComponent } from './sentinel-data-input/sentinel-data-input.component';
import { PlanAuswaehlenComponent } from './select-plan/select-plan.component';
import { PlanCardComponent } from './select-plan/plan-card/plan-card.component';
import { SelectedPlanDetailsComponent } from './selected-plan-details/selected-plan-details.component';

const appRoutes: Routes = [ //TODO: Auslagern in seperates File
  { path: 'daten', component: SentinelDataInputComponent },
  { path: 'auswaehlen', component: PlanAuswaehlenComponent },
  { path: 'konfigurieren/:selected', component: SelectedPlanDetailsComponent },
  // { path: 'drucken', component: PrintComponent },
  { path: '', redirectTo: 'daten', pathMatch: 'full'}, // wenn kein PATH eingegeben
  { path: '**', redirectTo: 'daten'} // wenn unbekannten PATH eingegeben
]

@NgModule({
  declarations: [
    AppComponent,
    SentinelDataInputComponent,
    PlanAuswaehlenComponent,
    PlanCardComponent,
    SelectedPlanDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    WachtDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
