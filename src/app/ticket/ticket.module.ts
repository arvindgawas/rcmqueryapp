import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket/ticket.component';
import { ticketRoutingModule} from './ticket-routing.module';
import { FormsModule }   from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatMenuModule } from '@angular/material';
  import {MatRadioModule} from '@angular/material/radio';
import { TicketdashComponent } from './ticketdash/ticketdash.component';
import { AddticketComponent } from './addticket/addticket.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { SendemailComponent } from './sendemail/sendemail.component';
import { TicketcountComponent } from './ticketcount/ticketcount.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [TicketComponent, TicketdashComponent, AddticketComponent, TicketdetailsComponent, SendemailComponent, TicketcountComponent, UploadComponent],
  imports: [
    CommonModule,
    ticketRoutingModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule

  ]
})
export class TicketModule { }
