import { Component, OnInit } from '@angular/core';
import { ticketmdoel} from '../../model/ticketmodel'
import { ticketRoutingModule } from '../ticket-routing.module';
import {TicketService} from '../../ticket.service';
import { Router } from '@angular/router';
import { errortype,Userdd,ddlist } from '../../model/errortype';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: [
    '../../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../../Content/vendor/metisMenu/metisMenu.min.css',
    '../../Content/dist/css/sb-admin-2.css',
    '../../Content/vendor/font-awesome/css/font-awesome.min.css'    
    ]
})
export class AddticketComponent implements OnInit {

  ticketmdoel : ticketmdoel = new ticketmdoel();
  ddlist : ddlist = new ddlist();
  errortype : number = 0;

  constructor(public TicketService: TicketService, public _router : Router) { }

  ngOnInit() {

    this.ticketmdoel.ticketdate  = new Date();
          /*
    this.TicketService.getddlist("PICKUP")
     .subscribe(
        (data) => {
            console.log(data)
            this.ddlist = data;
        },error => {
            alert(error);
            console.log("Error getting dashboard count.", error);
        });
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
         this.ticketmdoel.company = data.Company
     },error => {
         alert(error);
         console.log("Error getting dashboard count.", error);
     });

 
    }

    onCrnOutEvent(event: any){

      console.log(event.target.value);
      if (this.ticketmdoel.crnno != "undefined" && this.ticketmdoel.crnno != null) 
      //&& this.ticketmdoel.clientcode !="undefined"  && this.ticketmdoel.clientcode !=null)
      {
        
      this.TicketService.Getrcmdatamanual(this.ticketmdoel.crnno,this.ticketmdoel.clientcode )
      .subscribe(
       (data) => {
           console.log(data)
           this.ticketmdoel.pickupcode = data.pickupcode;
           this.ticketmdoel.clientcode = data.clientcode;
           this.ticketmdoel.client = data.clientname
           this.ticketmdoel.region = data.region
           this.ticketmdoel.location = data.location
           this.ticketmdoel.hublocation = data.hublocation
           this.ticketmdoel.area = data.area
           this.ticketmdoel.cdpncm = data.cdpncm
           this.ticketmdoel.customertype = data.customertype
           this.ticketmdoel.hierarchycode = data.hierarchycode
           this.ticketmdoel.bank = data.customer
       },error => {
           alert(error);
           console.log("Error getting dashboard count.", error);
       });
 
      }
    }  
  onSubmit()
  {
    console.log(this.ticketmdoel);
    this.TicketService.AddTicket(this.ticketmdoel)
    .subscribe(
      (data) => {
          console.log(data);
          alert("Data Saved Successfully.") 
          this._router.navigate(['/ticket/all']);

      },error => {
          alert(error);
          console.log("Error Saving Add ticket.", error);
      });
  }

}

/*
<div class="form-group">
    <label for="file">Choose File</label>
    <input type="file"
           id="file"
           (change)="handleFileInput($event.target.files)">
</div>

Step 2: Upload Handling in TypeScript (file-upload.component.ts)

Define a default variable for selected file.

fileToUpload: File = null;
Create function which you use in (change)-event of your file input tag:

handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

            <div class="row">

                <div class="col-md-4">
                    <label for="name">Mistake Done by</label>
                    <select  name="mistakedoneby" #refQuestionBank="ngModel" class="form-control" [(ngModel)]="ticketmdoel.mistakedoneby">
                        <option value=''>Please select Value</option>
                        <option value='Location'>Location</option>
                        <option value='Customer'>Customer</option>
                        <option value='HO'>HO</option>
                        <option value='None'>None</option>
                    </select>
                </div>

                <div class="col-md-4">
                    <label for="name">Type of Error</label>
                    <select  name="errortype" #referrortype="ngModel" class="form-control" [(ngModel)]="ticketmdoel.errortype">    
                        <option value=''>Please select Value</option>
                        <option *ngFor="let errortype of ddlist.errortypelst" [ngValue]="errortype.ID">
                            {{errortype.ErrorName}}
                         </option>
                    </select>    
                </div>
                
                <div class="col-md-4">
                    <label for="name">Problem Details</label>
                    <textarea type="text" name="problem" id="problem" #refproblem="ngModel"  class="form-control" [(ngModel)]="ticketmdoel.problem"></textarea>
                </div>
                </div>

*/