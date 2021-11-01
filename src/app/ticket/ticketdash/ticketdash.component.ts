import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ticketmdoel} from '../../model/ticketmodel'
import {TicketService} from '../../ticket.service';
import {ddlisttracker,customer,User} from '../../model/reportddlist';
import { Router,ActivatedRoute } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-ticketdash',
  templateUrl: './ticketdash.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})

export class TicketdashComponent implements OnInit {

  pageno : string;
  pagesize : string;
  lstqbank: ticketmdoel[]=[];
  lstaccepttickets: ticketmdoel[]=[];
  ticketdatefilter: Date = new Date();
  tickettodate: Date = new Date();
  sdate : string;
  dataSource: any;
  userdata : any ;
  userrole : any ;
  datefilter : any;
  datetofilter : any;
  filter : string="";
  fileToUpload: File = null;
  adminrole :boolean=false;
  ddlisttracker : ddlisttracker = new ddlisttracker();
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    public batchno: string;
    public rejectremark:string;
  displayedColumns: string[] = ['select','batchno','ticketno','ticketdate','tickettype','bank','crnno','pickupcode','clientcode','emailsubject','acceptstatus','rejectremark','oldbatchno','status','assignedto','EditAction']
  
 //,'bank' ,'ticketamount','status','actiontaken','hublocation','location','region','area','client','crnno','clientcode',];
 //,'DeleteAction'

  constructor(public TicketService: TicketService, public _router : Router,private _routeParams: ActivatedRoute) { 

    this._routeParams.queryParams.subscribe(params => {
      this.filter = params['filter']
    });
  }

  ticketedit()
  {
    localStorage.setItem('pageno', this.dataSource.paginator.pageIndex);
    localStorage.setItem('pagesize', this.dataSource.paginator.pageSize);

  }

  AllPendng()
  {
    this.TicketService.GetAllTicketsfordate("","",this.userdata.name,this.userrole.userrole,this.filter)
    //this.TicketService.GetAllTickets(this.userdata.name,this.userrole.userrole)
     .subscribe(
       (data) => {
           console.log(data);
           this.lstqbank = data;
           this.dataSource = new MatTableDataSource(this.lstqbank );
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;
           console.log(11111);
           console.log(this.filter);
           if (!this.filter)
           {
           } 
           else
           {
             this.applyFilter(this.filter);
           }  
       },error => {
           alert(error);
           console.log("Error getting all tickets.", error);
       });

  }

  Refresh()
  {
    localStorage.setItem('pageno', "0");
    localStorage.setItem('pagesize', "5");
    this.ngOnInit();
  }

  ngOnInit() {
    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.userrole = JSON.parse(localStorage.getItem('userrole'));
    this.datefilter = JSON.parse(localStorage.getItem('datefilter'));
    this.datetofilter = JSON.parse(localStorage.getItem('todate'));
    this.pageno = localStorage.getItem('pageno')
    this.pagesize = localStorage.getItem('pagesize')
    if (this.userrole.userrole == 'admin')
    {
        this.adminrole =true;
    }
    else
    {
      this.adminrole =false;
    }
    this.datefilter.datefilter = formatDate(this.datefilter.datefilter, 'yyyy/MM/dd', 'en');
    this.datetofilter.todate = formatDate(this.datetofilter.todate, 'yyyy/MM/dd', 'en');
    this.ticketdatefilter = this.datefilter.datefilter;
    this.tickettodate = this.datetofilter.todate;
    //alert(this.datefilter.datefilter);
    this.TicketService.GetAllTicketsfordate(this.datefilter.datefilter,this.datetofilter.todate,this.userdata.name,this.userrole.userrole,this.filter)
    //this.TicketService.GetAllTickets(this.userdata.name,this.userrole.userrole)
     .subscribe(
       (data) => {
           console.log(data);
           this.lstqbank = data;
           this.dataSource = new MatTableDataSource(this.lstqbank );
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;
           console.log(11111);
           console.log(this.filter);
           if (!this.filter)
           {
           } 
           else
           {
             this.applyFilter(this.filter);
           }  
           this.dataSource.paginator.pageIndex = this.pageno;
           this.dataSource.paginator.pageSize = this.pagesize;
           this.dataSource.paginator = this.paginator;
       },error => {
           alert(error);
           console.log("Error getting all tickets.", error);
       });
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onFocusOutEvent(){
      localStorage.setItem('datefilter', JSON.stringify({ datefilter: this.ticketdatefilter.toString()}));
      localStorage.setItem('todate', JSON.stringify({ todate: this.tickettodate.toString()}));
      this.TicketService.GetAllTicketsfordate(this.ticketdatefilter.toString(),this.tickettodate.toString(),this.userdata.name,this.userrole.userrole,this.filter)
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

      onFocusOutTodate()
      {
        localStorage.setItem('datefilter', JSON.stringify({ datefilter: this.ticketdatefilter.toString()}));
        localStorage.setItem('todate', JSON.stringify({ todate: this.tickettodate.toString()}));
      this.TicketService.GetAllTicketsfordate(this.ticketdatefilter.toString(),this.tickettodate.toString(),this.userdata.name,this.userrole.userrole,this.filter)
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

  Delete(ticketno:string)
  {
    if (confirm("Do You want to Delete this Ticket?")) 
    {
       this.TicketService.DeleteTicket(ticketno)
      .subscribe(
      (data) => {
          alert("Ticekt Deleted Successfully.");
          this.ngOnInit();
          console.log(data);
      },error => {
          alert(error);
          console.log("Error Dleteting ticket.", error);
      });
    }  
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

  editedselet(element : ticketmdoel)
  {
    console.log(222222);
    console.log(element);

    if (this.lstaccepttickets.some((a => a.ticketno ==  element.ticketno)) )
    {
      
      this.lstaccepttickets = this.lstaccepttickets.filter( a=> a.ticketno != element.ticketno);

      if (element.select)
      {
        this.lstaccepttickets.push(element);
      }

    }
    else
    {
      this.lstaccepttickets.push(element);
    }

    console.log(this.lstaccepttickets);  

  }

  acceptsubmit()
  {

    for (var ti of this.lstaccepttickets)
    {
      if ((ti.acceptstatus=="Reject") || (ti.acceptstatus=="Duplicate"))
      {
        if (ti.rejectremark == undefined || ti.rejectremark == null || ti.rejectremark =="")
      {
        alert("Reamrk is Mandatory.");
        return;
      }
      } 
    }     
    
    this.TicketService.UpdateTicketAccept(this.lstaccepttickets)
    .subscribe(
      (data) => {
          alert("Accept Status Saved Successfully.");
          this.ngOnInit();
          console.log(data);
      },error => {
          alert(error);
          console.log("Error getting all tickets.", error);
      });

  }

  DeleteSubmit()
  {
    if (this.lstaccepttickets.length > 0 )
    {
      if (confirm("Are You Sure to Delete these Tickets?")) 
      {
        this.TicketService.DeleteTicketAll(this.lstaccepttickets)
        .subscribe(
          (data) => {
              alert("Deleted Successfully.");
              this.ngOnInit();
              console.log(data);
          },error => {
              alert(error);
              console.log("Error getting all tickets.", error);
          });
      } 
    }
  }

}
