import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditexamuserComponent } from './editexamuser.component';

describe('EditexamuserComponent', () => {
  let component: EditexamuserComponent;
  let fixture: ComponentFixture<EditexamuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditexamuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditexamuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
