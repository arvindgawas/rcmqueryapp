import { Component, OnInit } from '@angular/core';
import {ticketcount} from '../../model/ticketcount';
import { TicketService } from '../../ticket.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticketcount',
  templateUrl: './ticketcount.component.html',
  styleUrls: [
    '../../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../../Content/vendor/metisMenu/metisMenu.min.css',
    '../../Content/dist/css/sb-admin-2.css',
    '../../Content/vendor/font-awesome/css/font-awesome.min.css'    
    ]
})
export class TicketcountComponent implements OnInit {

  ticketcount : ticketcount = new ticketcount();
  lstticketcount : ticketcount[];
  ticketdate :string;
  userdata : any ;
  userrole :any ;
  adminrole :boolean=false;
  constructor(public TicketService : TicketService,private _routeParams: ActivatedRoute) { 
    this._routeParams.queryParams.subscribe(params => {
      this.ticketdate = params['ticketdate']
    });
  }

  ngOnInit() {

    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.userrole = JSON.parse(localStorage.getItem('userrole'));

    console.log(this.userrole.userrole);

    if (this.userrole.userrole == 'admin')
    {
        this.adminrole =true;
    }
    
     this.TicketService.getdashboardcount(this.userdata.name ,this.ticketdate.toString(),this.userrole.userrole)
    .subscribe(
       (data) => {
           console.log(data)
           this.lstticketcount = data;
       },error => {
           alert(error);
           console.log("Error getting dashboard count.", error);
       });

    
  }

}
