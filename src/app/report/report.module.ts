import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker/tracker.component';
import { ReportRoutingModule} from './report-routing.module';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [TrackerComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule
  ]
})
export class ReportModule { }
