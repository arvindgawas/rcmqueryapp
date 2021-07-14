import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { MatTableModule,MAT_DATE_LOCALE } from '@angular/material';
import { MatDialogModule,MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpRequestInterceptor } from './HttpRequestInterceptor';
import { DatePipe } from '@angular/common';
 

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
      ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule
  ],
  providers: [DatePipe,
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
      {provide: MAT_DATE_LOCALE, useValue:  'en-IN'}
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
