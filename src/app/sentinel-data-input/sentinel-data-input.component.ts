import { Component, OnInit } from '@angular/core';
import { Wacht } from '../../Wacht';
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
  selector: 'app-wacht-daten',
  templateUrl: 'sentinel-data-input.component.html',
  styleUrls: ['sentinel-data-input.component.css']
})
export class SentinelDataInputComponent implements OnInit {
  sentinelDataForm: FormGroup;
  loading: boolean = false;

  constructor(
    private wachtDataService: WachtDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.sentinelDataForm) return;
    this.sentinelDataForm = this.formBuilder.group({
      kdt: ['', [Validators.required, Validators.minLength(2)]],
      stv: ['', [Validators.required, Validators.minLength(2)]],
      datefrom: [new Date(), [Validators.required]],
      dateto: [new Date(), [Validators.required]],
      gruppen: this.formBuilder.array([
        this.initGruppe()
      ])
    });
  }

  public valideAnzWachtleute(): boolean {
    var anzPeople = this.countWachtleute(this.sentinelDataForm.value.gruppen);
    if (anzPeople < minNumberGuards || anzPeople > maxNumberGuards) return false;
    return true;
  }

  public validSentinelDuration(): boolean {
    var dauerInStunden = (this.sentinelDataForm.value.dateto.valueOf() - this.sentinelDataForm.value.dateto.valueOf()) / 1000 / 60 / 60;
    if (dauerInStunden > maxSentinelDurationInHours || dauerInStunden < minSentinelDurationInHours) return false;
    return true;
  }

  // TODO: beim Zurückgehen auf den Wacht-Daten Screen soll das bereits abgefüllte Formular angezeigt werden
  // TODO: bei Zweimaligem Durchgang (erneutes Abfüllen des Formulars) sollten alle Daten des letzten Durchganges gelöscht werden
  public onFormSubmit() {
    this.loading = true;
    this.wachtDataService.reset();

    // Setze Gruppen zusammen
    var personenArray: Array<Person> = this.extractAllPersonen(this.sentinelDataForm.value.gruppen);

    // Erstelle Wacht-Objekt für Speicherung im DataService
    this.wachtDataService.setWacht(new Wacht(
      new Person(this.sentinelDataForm.value.kdt),
      new Person(this.sentinelDataForm.value.stv),
      this.sentinelDataForm.value.datefrom,
      this.sentinelDataForm.value.dateto,
      personenArray
    ));

    this.loading = false;
    this.router.navigateByUrl('/auswaehlen');
  }

  public addGruppe(): void {
    const control = <FormArray>this.sentinelDataForm.get('gruppen');
    control.push(this.initGruppe());
  }

  private initGruppe():FormGroup {
    return this.formBuilder.group({
      name1: ['', [Validators.minLength(2)]],
      name2: ['', [Validators.minLength(2)]]
    });
  }

  private countWachtleute(array: Array<{name1: string, name2: string}>): number {
    var counter = 0;
    for(var index = 0; index < array.length; index++) {
      if (array[index].name1) counter++;
      if (array[index].name2) counter++;
    }
    return counter;
  }

  private extractAllPersonen(array: Array<{name1: string, name2: string}>): Array<Person> {
    var personen: Array<Person> = Array<Person>();
    for (var index = 0; index < array.length; index++) {
      if (array[index].name1) personen.push(new Person(array[index].name1));
      if (array[index].name2) personen.push(new Person(array[index].name2));
    }
    return personen;
  }

  // For testing purposes only
  public fillAndNext() {
    var personenArray: Array<Person> = [new Person('Andrin1'), new Person('Andrin2'), new Person('Andrin3'), new Person('Andrin4'), new Person('Andrin5'), new Person('Andrin6'), new Person('Andrin7'), new Person('Andrin8'), new Person('Andrin9')];
    var dateBis:Date = new Date(new Date().setDate(new Date().getDate() +1));
    this.wachtDataService.setWacht(new Wacht(
      new Person('Chef'),
      new Person('Halbechef'),
      new Date(),
      dateBis,
      personenArray
    ));
    this.router.navigateByUrl('/auswaehlen');
  }
}
