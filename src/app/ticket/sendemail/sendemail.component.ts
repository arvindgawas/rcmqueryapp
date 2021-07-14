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
  
  constructor(public TicketService: TicketService, public _router : Router,private _routeParams: ActivatedRoute) 
  { 

    this._routeParams.queryParams.subscribe(params => {
      this.email.emailsubject1 = params['subject']
      this.email.ticketno = params['ticketno']
      this.email.filepath = params['emailbody']
    });
  }

  ngOnInit() {

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
    console.log(this.email)
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



