import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../ticket.service'
import { exammastermdoel} from '../../model/exammastermodel'
import { user} from '../../model/user'
import { userbankmap } from '../../model/user';

@Component({
  selector: 'app-addexamuser',
  templateUrl: './addexamuser.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class AddexamuserComponent implements OnInit {

  user: user = new user();

  lstuserbankmap : userbankmap[]=[]; 
  
  lstexammastermdoel: exammastermdoel[]=[];

  constructor(public TicketService: TicketService, public _router : Router) { }

  ngOnInit() {
    this.TicketService.GetUserBankMaster()
    .subscribe(
     (data) => {
          console.log(data)
          this.lstuserbankmap = data;
         },error => {
         alert(error);
         console.log("Error getting dashboard count.", error);
     });
  }

  onSubmit()
  {
     this.user.lstuserbankmap = this.lstuserbankmap;
    let userdata : any ;
    let ID : string;
    userdata = JSON.parse(localStorage.getItem('currentUser'));
    //ID = userdata.name;
    //this.user.Createdby = ID;
    
    this.TicketService.SaveUser(this.user)
    .subscribe(
      (data) => {
          console.log(data);
          alert("Data Saved Successfully.") 
          this._router.navigate(['/userexam/']);

      },error => {
          alert(error);
          console.log("Error Saving Spares", error);
      });
  }

}











