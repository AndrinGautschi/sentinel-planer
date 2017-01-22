import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { MaterialModule } from '@angular/material'; // standard Material Library
import { Md2Module } from 'md2'; // für Date-/Timepicker

import { AppComponent } from './app.component';
import { TagesansichtComponent } from './tagesansicht/tagesansicht.component';

import { WachtDataService } from './wacht-data.service';
import { SentinelDataComponent } from './wacht-daten/sentinel-data.component';
import { PlanAuswaehlenComponent } from './plan-auswaehlen/plan-auswaehlen.component';
import { PlanCardComponent } from './plan-card/plan-card.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';

const appRoutes: Routes = [ //TODO: Auslagern in seperates File
  { path: 'daten', component: SentinelDataComponent },
  { path: 'auswaehlen', component: PlanAuswaehlenComponent },
  { path: 'konfigurieren/:selected', component: PlanDetailsComponent },
  { path: 'drucken', component: TagesansichtComponent },
  { path: '', redirectTo: 'daten', pathMatch: 'full'}, // wenn kein PATH eingegeben
  { path: '**', redirectTo: 'daten'} // wenn unbekannten PATH eingegeben
]

@NgModule({
  declarations: [
    AppComponent,
    TagesansichtComponent,
    SentinelDataComponent,
    PlanAuswaehlenComponent,
    PlanCardComponent,
    PlanDetailsComponent
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
