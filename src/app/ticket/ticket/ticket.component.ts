import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {ticketmdoel} from '../../model/ticketmodel';
import { TicketService } from '../../ticket.service';
import { errortype,Userdd,ddlist } from '../../model/errortype';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: [
    '../../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../../Content/vendor/metisMenu/metisMenu.min.css',
    '../../Content/dist/css/sb-admin-2.css',
    '../../Content/vendor/font-awesome/css/font-awesome.min.css'    
    ]
})
export class TicketComponent implements OnInit {

  ticketmdoel : ticketmdoel = new ticketmdoel();
  ddlist : ddlist = new ddlist();
  Id :any;
  errortype : number = 0;
  fileToUpload: File = null;
  userrole : any;
  adminrole :boolean=false;
  errorexist : boolean=false;

  constructor(public TicketService : TicketService, public _router : Router,private _routeParams: ActivatedRoute ) { }

  ngOnInit() {
    this.errorexist = false;
    this.userrole = JSON.parse(localStorage.getItem('userrole'));
    if (this.userrole.userrole == 'admin')
    {
        this.adminrole =true;
        console.log('2222222');
        console.log(this.adminrole);
    }

    this.Id = this._routeParams.snapshot.params['ID'];    

    this.TicketService.GetTicket(this.Id )
    .subscribe(
     (data) => {
         console.log(data)
         this.ticketmdoel = data;
         this.TicketService.getddlist(this.ticketmdoel.tickettype)
         .subscribe(
            (data) => {
                console.log(data)
                this.ddlist = data;
            },error => {
                alert(error);
                console.log("Error getting dashboard count.", error);
            });

         this.errortype =  Number(this.ticketmdoel.errortype);
         if (this.errortype >0)
         {
             this.errorexist = true;
             console.log("errortyp");
             console.log(this.errorexist);
         } 
         console.log(this.errortype)
     },error => {
         alert(error);
         console.log("Error getting dashboard count.", error);
     });

    
  }

  onchangetickettype()
  {
    this.TicketService.getddlist(this.ticketmdoel.tickettype)
    .subscribe(
       (data) => {
           console.log(data)
           this.ddlist = data;
       },error => {
           alert(error);
           console.log("Error getting dashboard count.", error);
       });
  }


  onChangeEvent()
  {
      /*
    if (this.ticketmdoel.acceptstatus=="Accept")
    {
        this.TicketService.Sendacceptemail(this.ticketmdoel.batchno )
        .subscribe(
        (data) => {
            console.log(data)           
        },error => {
            alert(error);
            console.log("Error getting dashboard count.", error);
        });
    }
    */
  }


  onFocusOutEvent(event: any){

    console.log(event.target.value);
    this.TicketService.Getcrnno(this.ticketmdoel.bank,this.ticketmdoel.pickupcode,this.ticketmdoel.clientcode )
    .subscribe(
     (data) => {
         console.log(data)
         this.ticketmdoel.crnno = data.crn;
         this.ticketmdoel.client = data.clientname
         this.ticketmdoel.region = data.region
         this.ticketmdoel.location = data.location
         this.ticketmdoel.hublocation = data.hublocation
         this.ticketmdoel.area = data.area
         this.ticketmdoel.cdpncm = data.cdpncm
         this.ticketmdoel.customertype = data.customertype
         this.ticketmdoel.hierarchycode = data.hierarchycode
     },error => {
         alert(error);
         console.log("Error getting dashboard count.", error);
     });

 
    }

    onCrnOutEvent(event: any){

        console.log(event.target.value);
        this.TicketService.Getrcmdata(this.ticketmdoel.crnno,this.ticketmdoel.clientcode )
        .subscribe(
         (data) => {
             console.log(data)
             this.ticketmdoel.pickupcode = data.pickupcode;
             this.ticketmdoel.client = data.clientname
             this.ticketmdoel.region = data.region
             this.ticketmdoel.location = data.location
             this.ticketmdoel.hublocation = data.hublocation
             this.ticketmdoel.area = data.area
             this.ticketmdoel.cdpncm = data.cdpncm
             this.ticketmdoel.customertype = data.customertype
             this.ticketmdoel.hierarchycode = data.hierarchycode
         },error => {
             alert(error);
             console.log("Error getting dashboard count.", error);
         });
    
     
        }   

 onFileChange(event) {
        if (event.target.files.length > 0) {
          this.fileToUpload = event.target.files[0];
        }
 }

 downloadDocFile(filepath : string,filename : string)
 {
    this.TicketService.downloadDocFile(filepath,filename);
    /*
    this.TicketService.downloadnew(filepath,filename)
    .subscribe(
        (data) => {
            console.log(data)           
        },error => {
            alert(error);
            console.log("Error while uploading file.", error);
        });
        */
 }

downloadEmailBody(filepath : string,filename : string,ticketno : string)
{
    let extn = filename.substr(-5,5);
    let filep = filepath.replace('Z:/','//172.19.100.157/nfsrmsuat/')
    let filen = "EmailBody"+ticketno+extn;
    this.TicketService.downloadDocFile(filep,filen);
}

SendCloseResponse()
 {
    if (confirm("Do You want to Send Close Response?")) 
    {
        this.ticketmdoel.SendAutoCloseResponse='Y';

        this.TicketService.SendCloseResponse(this.ticketmdoel)
        .subscribe(
        (data) => {
            console.log(data);
            alert("Close Response Sent Successfully.") 
            },error => {
                alert(error);
                console.log("Error Saving Ticket Data.", error);
            });
    } 
    
 }


onSubmit()
  {
     if (this.ticketmdoel.acceptstatus!= 'Accept')
     {
        alert("Please Accept the ticket First on Ticket Dashboard Page.");
        this._router.navigate(['/ticket/all']);
        return;
     } 

    this.ticketmdoel.errortype= this.errortype;
    console.log(this.ticketmdoel);

    this.ticketmdoel.SendAutoCloseResponse='N';

    if (this.ticketmdoel.status=="Close")
    {
        if (confirm("Do You want to Send Auto Close Response?")) 
        {
            this.ticketmdoel.SendAutoCloseResponse='Y';
        } 
    }
    
    this.TicketService.UpdateTicket(this.ticketmdoel)
    .subscribe(
      (data) => {
          console.log(data);
          alert("Data Saved Successfully.") 

        /*
        if   (this.ticketmdoel.status="Open")
        { 
            this.TicketService.Sendacceptemail(this.ticketmdoel.batchno)
            .subscribe(
            (data) => {
                console.log(data)           
            },error => {
                alert(error);
                console.log("Error while sending accept email.", error);
            });
        }
        */
       
        if (this.fileToUpload != null)
        {
            this.TicketService.postFile(this.fileToUpload,this.ticketmdoel.ticketno)
            .subscribe(
            (data) => {
                console.log(data)           
            },error => {
                alert(error);
                console.log("Error while uploading file.", error);
            });
        }
        
         this._router.navigate(['/ticket/all']);

      },error => {
          alert(error);
          console.log("Error Saving Ticket Data.", error);
      });
  }

}

/*

<div class="col-md-4">
                    <label for="name">Ticket Amount</label>
                    <input type="text" class="form-control"   name="ticketamount" [(ngModel)]="ticketmdoel.ticketamount" maxlength="50"
                    #refExamName="ngModel" id="ticketamount">
                </div>

                <div class="col-md-4">
                    <label for="name">Actual Amount</label>
                    <input type="text" class="form-control"   name="actualamount" [(ngModel)]="ticketmdoel.actualamount" maxlength="50"
                    #refExamName="ngModel" id="actualamount">
                </div>

                    <div class="col-md-4">
                    <label for="name">Ticket HCIN No</label>
                    <input type="text" class="form-control"  name="status" [(ngModel)]="ticketmdoel.tickethcin" maxlength="50"
                    #refExamName="ngModel" id="tickethcin">
                </div>

                <div class="col-md-4">
                    <label for="name">Actual HCIN No</label>
                    <input type="text" class="form-control"   name="actualhcin" [(ngModel)]="ticketmdoel.actualhcin" maxlength="50"
                    #refExamName="ngModel" id="actualhcin">
                </div>

                
                <div class="col-md-4">
                    <label for="name">Pickup Date</label>
                    <input type="text" class="form-control"  name="pickupdate" [(ngModel)]="ticketmdoel.pickupdate" maxlength="50"
                    #refpickupdate="ngModel" id="pickupdate">
                </div>

                <div class="col-md-4">
                    <label for="name">Area</label>
                    <input type="text" class="form-control" readonly name="area" [(ngModel)]="ticketmdoel.area" maxlength="50"
                    #refExamName="ngModel" id="area">
                </div>
                               
                <div class="col-md-4">
                    <label for="name">CDP/NCM</label>
                    <input type="text" class="form-control" readonly name="cdpncm" [(ngModel)]="ticketmdoel.cdpncm" maxlength="50"
                    #refExamName="ngModel" id="cdpncm">
                </div>

                                <div class="col-md-4">
                    <label for="name">Query Resolved Date</label>
                    <input type="text" class="form-control" readonly name="resolveddate" [(ngModel)]="ticketmdoel.resolveddate" maxlength="50"
                    #refExamName="ngModel" id="resolveddate">
                </div>



*/