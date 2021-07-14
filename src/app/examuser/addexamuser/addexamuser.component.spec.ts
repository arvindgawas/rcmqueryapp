import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexamuserComponent } from './addexamuser.component';

describe('AddexamuserComponent', () => {
  let component: AddexamuserComponent;
  let fixture: ComponentFixture<AddexamuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddexamuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddexamuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
