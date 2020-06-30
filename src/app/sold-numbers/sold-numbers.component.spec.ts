import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldNumbersComponent } from './sold-numbers.component';

describe('SoldNumbersComponent', () => {
  let component: SoldNumbersComponent;
  let fixture: ComponentFixture<SoldNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
