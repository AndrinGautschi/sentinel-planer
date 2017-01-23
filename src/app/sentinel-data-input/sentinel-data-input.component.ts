import { Component, OnInit } from '@angular/core';
import { Sentinel } from '../../Sentinel';
import {WachtDataService} from "../wacht-data.service";
import {FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from "@angular/forms";
import {Person} from "../../Person";
import {Router} from "@angular/router";

// TODO: Bussiness-relevante Grenzwerte in einen Service auslagern
const maxNumberGuards: number = 16;
const minNumberGuards: number = 4;
const minSentinelDurationInHours: number = 4;
const maxSentinelDurationInHours: number = 300; // Random Zahl, um zu verhindern, dass jemand ein ganzes Jahr verplant.
                                                // Desweiteren spielt es über grosse Zeiträume hinweg keine erhebliche
                                                // Rolle, wie ein Plan gemacht wird, da sich automatisch eine Fairness bildet.

@Component({
  selector: 'app-sentinel-data-input',
  templateUrl: 'sentinel-data-input.component.html',
  styleUrls: ['sentinel-data-input.component.css']
})
// TODO: beim zurück Navigieren auf den Sentinel Data Screen soll das bereits abgefüllte Formular angezeigt werden
// TODO: bei Zweimaligem Durchgang (erneutes Abfüllen des Formulars) sollten alle Daten des letzten Durchganges gelöscht werden
// TODO: Testen aller Methoden
// Verwaltet das Input-Formular, auf Basis dessen die restliche Applikation ihre Arbeit verrichtet
export class SentinelDataInputComponent implements OnInit {
  public sentinelDataForm: FormGroup;
  public loading: boolean;

  constructor(
    private sentinelData: WachtDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.sentinelDataForm = this.formBuilder.group({
      commander: ['', [Validators.required, Validators.minLength(2)]],
      deputy: ['', [Validators.required, Validators.minLength(2)]],
      datefrom: [new Date(), [Validators.required]],
      dateto: [new Date(), [Validators.required]],
      groups: this.formBuilder.array([
        this.initializeGroupOfTwo()
      ])
    });
  }

  public onSentinelDataFormSubmit() {
    this.loading = true;
    this.sentinelData.reset(); // Damit allfällige Daten eines vorgängigen Durchganges nicht Fehler produzieren
    var people: Array<Person> = this.extractPeopleFromInputForm(this.sentinelDataForm.value.groups);
    this.sentinelData.setSentinel(new Sentinel(
      new Person(this.sentinelDataForm.value.commander),
      new Person(this.sentinelDataForm.value.deputy),
      this.sentinelDataForm.value.datefrom,
      this.sentinelDataForm.value.dateto,
      people
    ));
    this.loading = false;
    this.router.navigateByUrl('/auswaehlen');
  }

  public validNumberOfGurads(): boolean {
    var numberOfGuards = this.countGuards(this.sentinelDataForm.value.groups);
    if (numberOfGuards < minNumberGuards || numberOfGuards > maxNumberGuards) return false;
    return true;
  }

  public validSentinelDuration(): boolean {
    var durationInHours = (this.sentinelDataForm.value.dateto.valueOf() - this.sentinelDataForm.value.dateto.valueOf()) / 1000 / 60 / 60;
    if (durationInHours > maxSentinelDurationInHours || durationInHours < minSentinelDurationInHours) return false;
    return true;
  }

  public addGroupOfTwo(): void {
    const control = <FormArray>this.sentinelDataForm.get('groups');
    control.push(this.initializeGroupOfTwo());
  }

  private initializeGroupOfTwo():FormGroup {
    return this.formBuilder.group({
      name1: ['', [Validators.minLength(2)]],
      name2: ['', [Validators.minLength(2)]]
    });
  }

  private countGuards(array: Array<{name1: string, name2: string}>): number { // Zählt nur alle abgefüllten Felder
    var counter = 0;
    for(var index = 0; index < array.length; index++) {
      if (array[index].name1) counter++;
      if (array[index].name2) counter++;
    }
    return counter;
  }

  private extractPeopleFromInputForm(array: Array<{name1: string, name2: string}>): Array<Person> {
    var guards: Array<Person> = Array<Person>();
    for (var index = 0; index < array.length; index++) {
      if (array[index].name1) guards.push(new Person(array[index].name1));
      if (array[index].name2) guards.push(new Person(array[index].name2));
    }
    return guards;
  }

  // Nur für interaktives Testen!
  public fillAndNext() {
    var guards: Array<Person> = [new Person('Andrin1'), new Person('Andrin2'), new Person('Andrin3'), new Person('Andrin4'), new Person('Andrin5'), new Person('Andrin6'), new Person('Andrin7'), new Person('Andrin8'), new Person('Andrin9')];
    var dateTo:Date = new Date(new Date().setDate(new Date().getDate() +1));
    this.sentinelData.setSentinel(new Sentinel(
      new Person('Chef'),
      new Person('Halbechef'),
      new Date(),
      dateTo,
      guards
    ));
    this.router.navigateByUrl('/auswaehlen');
  }
}
