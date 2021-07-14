import { Component, OnInit } from '@angular/core';
import { report} from '../../model/report';
import {TicketService} from '../../ticket.service';
import {formatDate} from '@angular/common';
import {ddlisttracker,customer,User} from '../../model/reportddlist';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class TrackerComponent implements OnInit {

  report : report = new report();
  ddlisttracker : ddlisttracker = new ddlisttracker();

  constructor(public TicketService: TicketService) { }

  ngOnInit() {
    this.report.fromdate  = new Date();
    this.report.todate  = new Date();

    this.TicketService.gettrackerddlist()
    .subscribe(
       (data) => {
           console.log(data)
           this.ddlisttracker = data;
       },error => {
           alert(error);
           console.log("Error getting dashboard count.", error);
       });


  }

  downloadExcelFile()
  {
       this.TicketService.downloadExcelFile(this.report);
  }

}
