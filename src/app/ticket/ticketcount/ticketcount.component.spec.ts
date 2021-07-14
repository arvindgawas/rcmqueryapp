import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketcountComponent } from './ticketcount.component';

describe('TicketcountComponent', () => {
  let component: TicketcountComponent;
  let fixture: ComponentFixture<TicketcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
