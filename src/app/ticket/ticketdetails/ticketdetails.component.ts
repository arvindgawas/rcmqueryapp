import { Component, OnInit } from '@angular/core';
import { ticketdetails} from '../../model/ticketdetails';
import { Router,ActivatedRoute } from '@angular/router';
import { TicketService } from '../../ticket.service';
import {ticketmdoel} from '../../model/ticketmodel';
import { NativeDateAdapter } from '@angular/material';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: [
    '../../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../../Content/vendor/metisMenu/metisMenu.min.css',
    '../../Content/dist/css/sb-admin-2.css',
    '../../Content/vendor/font-awesome/css/font-awesome.min.css'    
    ]
})

export class TicketdetailsComponent implements OnInit {

    ticketdetails : ticketdetails ;
    listtd : ticketdetails[] =[];
    Id :any;
    ticketmdoel : ticketmdoel = new ticketmdoel();
    recordexist : boolean = false;

    
  constructor(public TicketService : TicketService, public _router : Router,private _routeParams: ActivatedRoute ) { }

  ngOnInit() {
    
    this.Id = this._routeParams.snapshot.params['ID'];

    this.TicketService.GetTicketdetails(this.Id)
     .subscribe(
      (data) => {
          console.log(data)
          this.listtd = data;
          if (this.listtd.length >0)
          {
            this.recordexist = true;
            
            this.TicketService.GetTicket(this.Id)
            .subscribe(
            (data) => {
                console.log(data)
                this.ticketmdoel = data;
                this.addna()
            },error => {
                alert(error);
                console.log("Error getting dashboard count.", error);
            });
          } 
          else
          {
            this.TicketService.GetTicket(this.Id)
            .subscribe(
            (data) => {
                console.log(data)
                this.ticketmdoel = data;
                this.addrow();
            },error => {
                alert(error);
                console.log("Error getting dashboard count.", error);
            });
          } 
      },error => {
          alert(error);
          console.log("Error getting dashboard count.", error);
      });
  }


  addna()
  {
    for (var ticketdetails of this.listtd)
    {
      console.log(121);
      console.log(this.ticketmdoel.errortype);
      if (this.ticketmdoel.errortype==1)
      {
        console.log(1);
        
        ticketdetails.wrongclientcode="NA";
        ticketdetails.wrongpickupcode="NA";
        ticketdetails.wrongcustomeruniquecode="NA";
        ticketdetails.soleid="NA";
        ticketdetails.bankbranchlocation="NA";
      }
      else if (this.ticketmdoel.errortype==5)
      {
        ticketdetails.wronghcin='NA';
        ticketdetails.wrongclientcode="NA";
        ticketdetails.wrongpickupcode="NA";
        ticketdetails.wrongcustomeruniquecode="NA";
        ticketdetails.soleid="NA";
        ticketdetails.bankbranchlocation="NA";
      }
      else if (this.ticketmdoel.errortype==6)
      {
        console.log(6);
        ticketdetails.wronghcin='NA';
        ticketdetails.wrongdispis='NA';
        ticketdetails.wrongclientcode="NA";
        ticketdetails.wrongpickupcode="NA";
        ticketdetails.wrongcustomeruniquecode="NA";
        ticketdetails.soleid="NA";
        ticketdetails.bankbranchlocation="NA";


      }
      else if (this.ticketmdoel.errortype==7)
      {
        console.log(7);
        ticketdetails.wronghcin='NA';
        ticketdetails.wrongdispis='NA';
        ticketdetails.wrongclientcode="NA";
        ticketdetails.wrongpickupcode="NA";
        ticketdetails.wrongcustomeruniquecode="NA";
        ticketdetails.soleid="NA";
        ticketdetails.bankbranchlocation="NA";

      }
      else if (this.ticketmdoel.errortype==8)
      {
        console.log(8);
        ticketdetails.wronghcin='NA';
        ticketdetails.wrongdispis='NA';
        ticketdetails.wrongclientcode="NA";
        ticketdetails.wrongpickupcode="NA";
        ticketdetails.wrongcustomeruniquecode="NA";
        ticketdetails.soleid="NA";
        ticketdetails.bankbranchlocation="NA";

      }
      else if (this.ticketmdoel.errortype==9)
      {
        console.log(9);
        ticketdetails.wronghcin='NA';
        ticketdetails.wrongdispis='NA';
        ticketdetails.wrongclientcode="NA";
        ticketdetails.wrongpickupcode="NA";
        ticketdetails.wrongcustomeruniquecode="NA";
        ticketdetails.soleid="NA";
        ticketdetails.bankbranchlocation="NA";
      }
      else
      {
        ticketdetails.customeruniquecode='NA';
        ticketdetails.wronghcin='NA';
        ticketdetails.wrongdispis='NA';
        ticketdetails.actualdispis='NA';
        ticketdetails.wrongclientcode="NA";
        ticketdetails.wrongpickupcode="NA";
        ticketdetails.wrongcustomeruniquecode="NA";
        ticketdetails.soleid="NA";
        ticketdetails.bankbranchlocation="NA";
          
      }
    }  
  }

  addrow()
  {
    console.log(this.ticketmdoel.errortype);
    if (this.ticketmdoel.errortype==1)
    {
      console.log(1);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="NA";
      this.ticketdetails.wrongpickupcode="NA";
      this.ticketdetails.wrongcustomeruniquecode="NA";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";


      this.ticketdetails.depostiondate="";
      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==2)
    {
      console.log(2);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="";
      this.ticketdetails.wrongpickupcode="";
      this.ticketdetails.wrongcustomeruniquecode="";
      this.ticketdetails.depostiondate="";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==3)
    {
      console.log(3);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="";
      this.ticketdetails.wrongpickupcode="";
      this.ticketdetails.wrongcustomeruniquecode="";
      this.ticketdetails.depostiondate="";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==4)
    {
      console.log(4);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="";
      this.ticketdetails.wrongpickupcode="";
      this.ticketdetails.wrongcustomeruniquecode="";
      this.ticketdetails.depostiondate="";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==5)
    {
      console.log(5);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='NA';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="NA";
      this.ticketdetails.wrongpickupcode="NA";
      this.ticketdetails.wrongcustomeruniquecode="NA";
      this.ticketdetails.depostiondate="";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==6)
    {
      console.log(6);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='NA';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='NA';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="NA";
      this.ticketdetails.wrongpickupcode="NA";
      this.ticketdetails.wrongcustomeruniquecode="NA";
      this.ticketdetails.depostiondate="";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==7)
    {
      console.log(7);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='NA';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='NA';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="NA";
      this.ticketdetails.wrongpickupcode="NA";
      this.ticketdetails.wrongcustomeruniquecode="NA";
      this.ticketdetails.depostiondate="";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==8)
    {
      console.log(8);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='NA';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='NA';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="NA";
      this.ticketdetails.wrongpickupcode="NA";
      this.ticketdetails.wrongcustomeruniquecode="NA";
      this.ticketdetails.depostiondate="";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.listtd.push(this.ticketdetails);
    }
    else if (this.ticketmdoel.errortype==9)
    {
      console.log(9);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='';
      this.ticketdetails.wronghcin='NA';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='NA';
      this.ticketdetails.actualdispis='';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="NA";
      this.ticketdetails.wrongpickupcode="NA";
      this.ticketdetails.wrongcustomeruniquecode="NA";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";

      this.ticketdetails.depostiondate="";
      this.listtd.push(this.ticketdetails);
    }
    else
    {
      console.log(0);
      this.ticketdetails = new ticketdetails();
      this.ticketdetails.ticketno=this.ticketmdoel.ticketno;
      this.ticketdetails.crnno=this.ticketmdoel.crnno;
      this.ticketdetails.pickupdate='';
      this.ticketdetails.clientcode=this.ticketmdoel.clientcode;
      this.ticketdetails.pickupcode=this.ticketmdoel.pickupcode;
      this.ticketdetails.customeruniquecode='NA';
      this.ticketdetails.wronghcin='NA';
      this.ticketdetails.actualhcin='';
      this.ticketdetails.wrongdispis='NA';
      this.ticketdetails.actualdispis='NA';
      this.ticketdetails.wrongamt=0
      this.ticketdetails.actualamt=0
      this.ticketdetails.wrongclientcode="NA";
      this.ticketdetails.wrongpickupcode="NA";
      this.ticketdetails.wrongcustomeruniquecode="NA";
      this.ticketdetails.soleid="NA";
      this.ticketdetails.bankbranchlocation="NA";
      this.ticketdetails.depostiondate="";
      this.listtd.push(this.ticketdetails);
    }
    console.log(this.listtd);
  }
  
  onSubmit()
  {
    for (var td of this.listtd)
    {
      console.log(td);
      console.log(td.pickupdate);
      if (td.pickupdate == undefined || td.pickupdate == null || td.pickupdate =="")
      {
        alert("Pickup Date is Mandatory.");
        return;
      }
    
      if (Date.parse(td.pickupdate) >  new Date().getTime())
      {
        alert("Pickup Date Can not be greater than today.");
        return;
      }
      
      
    }
             
    
    this.TicketService.InsertTiketDetails(this.listtd)
    .subscribe(
      (data) => {
          console.log(data);
          alert("Data Saved Successfully."); 
          this._router.navigate(['/ticket/all']);

      },error => {
          alert(error);
          console.log("Error Saving Ticket Data.", error);
      });
    }


  }


  /*
[disabled]="recordexist" 
*/


