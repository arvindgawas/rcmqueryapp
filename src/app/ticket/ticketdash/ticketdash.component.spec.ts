import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketdashComponent } from './ticketdash.component';

describe('TicketdashComponent', () => {
  let component: TicketdashComponent;
  let fixture: ComponentFixture<TicketdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
