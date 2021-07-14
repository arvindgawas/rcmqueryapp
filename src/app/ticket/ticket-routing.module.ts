import { Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { RouterModule } from  '@angular/router';
import { TicketComponent } from './ticket/ticket.component';
import { TicketdashComponent } from './ticketdash/ticketdash.component';
import { AddticketComponent} from './addticket/addticket.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { SendemailComponent } from './sendemail/sendemail.component';
import { TicketcountComponent} from './ticketcount/ticketcount.component';


const routes: Routes = [
    { path: '', component: TicketComponent },
    { path: 'edit/:ID', component: TicketComponent },
    { path: 'all', component: TicketdashComponent },
    { path: 'add', component: AddticketComponent },
    { path: 'details/:ID', component: TicketdetailsComponent },
    { path: 'sendemail', component: SendemailComponent },
    { path: 'ticketcount', component: TicketcountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ticketRoutingModule { }