import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAddComponent } from './to-add.component';

describe('ToAddComponent', () => {
  let component: ToAddComponent;
  let fixture: ComponentFixture<ToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
