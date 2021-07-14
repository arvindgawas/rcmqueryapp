import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamUserRoutingModule } from './examsuer-routing.module'
import { FormsModule }   from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material';
import { MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { AllexamuserComponent } from './allexamuser/allexamuser.component';
import { AddexamuserComponent } from './addexamuser/addexamuser.component';
import { EditexamuserComponent } from './editexamuser/editexamuser.component';

@NgModule({
  declarations: [AllexamuserComponent, AddexamuserComponent, EditexamuserComponent],
  imports: [
    ExamUserRoutingModule,
    CommonModule,
    FormsModule,
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

export class ExamuserModule { }



