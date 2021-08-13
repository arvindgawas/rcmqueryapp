import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service'
import { email} from '../../model/email'
import { Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: [
    '../../Content/vendor/bootstrap/css/bootstrap.min.css',
    '../../Content/vendor/metisMenu/metisMenu.min.css',
    '../../Content/dist/css/sb-admin-2.css',
    '../../Content/vendor/font-awesome/css/font-awesome.min.css'    
    ]
})
export class SendemailComponent implements OnInit {

  email : email = new email();
  lstemail : email[];
  batchno : string; 
  constructor(public TicketService: TicketService, public _router : Router,private _routeParams: ActivatedRoute) 
  { 
    this._routeParams.queryParams.subscribe(params => {
      this.email.emailsubject1 = params['subject']
      this.email.ticketno = params['ticketno']
      this.email.filepath = params['emailbody']
      this.email.toemailid = params['emailfrom']
      this.email.ccemailid = params['emailcc']
      this.batchno = params['batchno']
    });
  }

  ngOnInit() {
    if (this.batchno!="" && this.batchno!=null && this.batchno != undefined)
    {
      this.email.emailsubject1  = "Closed-"+this.batchno + " " +this.email.emailsubject1 
      this.email.emailbody = "Dear Sir/Madam,Your query has been closed vide batch no. " + this.batchno +
                       " and detailed report attached for your quick reference. Please note the interaction number for future reference. This is an auto acknowledgement mail. Kindly do not reply to this mail. Regards,CMS Customer Service Team";
    }

    this.TicketService.GetEmailHistory(this.email.ticketno)
    .subscribe(
    (data) => {
        console.log(data)
        this.lstemail = data;
    },error => {
        alert(error);
        console.log("Error getting dashboard count.", error);
    });
    
  }


  onSubmit()
  {
    this.TicketService.SendEmail(this.email)
    .subscribe(
      (data) => {
          console.log(data);
          this._router.navigate(['/ticket/all']);

      },error => {
         alert(error);
          console.log("Error Saving Spares", error);
      });
  }
      
  }



