import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ticketmdoel} from '../../model/ticketmodel'
import {TicketService} from '../../ticket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticketdash',
  templateUrl: './ticketdash.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})

export class TicketdashComponent implements OnInit {

  lstqbank: ticketmdoel[]=[];

  lstaccepttickets: ticketmdoel[]=[];

  ticketdatefilter: Date = new Date();

  sdate : string;
  
  dataSource: any;

  userdata : any ;
  userrole : any ;


  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    public batchno: string;
    public rejectremark:string;
  displayedColumns: string[] = ['batchno','ticketno','ticketdate','tickettype','bank','pickupcode','clientcode','emailsubject','acceptstatus','rejectremark','oldbatchno','status','assignedto','EditAction']
  
 //,'bank' ,'ticketamount','status','actiontaken','hublocation','location','region','area','client','crnno','clientcode',];

  constructor(public TicketService: TicketService, public _router : Router) { }

  ngOnInit() {
    console.log(555555); 

    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.userrole = JSON.parse(localStorage.getItem('userrole'));
    console.log(this.userdata.name); 
    console.log(this.userrole.userrole); 
    this.TicketService.GetAllTickets(this.userdata.name,this.userrole.userrole)
     .subscribe(
       (data) => {
           console.log(data);
           this.lstqbank = data;
           this.dataSource = new MatTableDataSource(this.lstqbank );
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;
       },error => {
           alert(error);
           console.log("Error getting all tickets.", error);
       });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onFocusOutEvent(){
     
      this.TicketService.GetAllTicketsfordate(this.ticketdatefilter.toString(),this.userdata.name,this.userrole.userrole)
     .subscribe(
       (data) => {
           console.log(data);
           this.lstqbank = data;
           this.dataSource = new MatTableDataSource(this.lstqbank );
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;
       },error => {
           alert(error);
           console.log("Error getting all tickets.", error);
       });
  
      }

      ProcessTAT()
      {
        this.TicketService.ProcessTAT(this.ticketdatefilter.toString())
        .subscribe(
       (data) => {
           console.log(data);
       },error => {
           alert(error);
           console.log("Error getting all tickets.", error);
       });
      }

  Delete(QBID:Number)
  {
  }

  edited(element : ticketmdoel)
  {
    console.log(111111);
    console.log(element);

    if (this.lstaccepttickets.some((a => a.ticketno ==  element.ticketno)) )
    {
      this.lstaccepttickets = this.lstaccepttickets.filter( a=> a.ticketno != element.ticketno);
      this.lstaccepttickets.push(element);
    }
    else
    {
      this.lstaccepttickets.push(element);
    }

    console.log(this.lstaccepttickets);  

  }

  acceptsubmit()
  {
    
    this.TicketService.UpdateTicketAccept(this.lstaccepttickets)
    .subscribe(
      (data) => {
          alert("Accept Status Saved Successfully.");
          console.log(data);
      },error => {
          alert(error);
          console.log("Error getting all tickets.", error);
      });

  }
}