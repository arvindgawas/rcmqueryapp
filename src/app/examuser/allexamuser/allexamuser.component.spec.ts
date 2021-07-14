import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllexamuserComponent } from './allexamuser.component';

describe('AllexamuserComponent', () => {
  let component: AllexamuserComponent;
  let fixture: ComponentFixture<AllexamuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllexamuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllexamuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
