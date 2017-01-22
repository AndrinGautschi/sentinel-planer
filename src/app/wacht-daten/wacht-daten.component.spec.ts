/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SentinelDataComponent } from './sentinel-data.component';

describe('SentinelDataComponent', () => {
  let component: SentinelDataComponent;
  let fixture: ComponentFixture<SentinelDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentinelDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentinelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
