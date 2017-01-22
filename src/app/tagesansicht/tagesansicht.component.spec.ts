/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagesansichtComponent } from './tagesansicht.component';

describe('TagesansichtComponent', () => {
  let component: TagesansichtComponent;
  let fixture: ComponentFixture<TagesansichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagesansichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagesansichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
