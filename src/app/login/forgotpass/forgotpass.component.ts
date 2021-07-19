import { Component, OnInit } from '@angular/core';
import { MatChipTrailingIcon } from '@angular/material';
import { sample } from 'rxjs/operators';
import { Router}  from '@angular/router';
import { LoginModel} from '../../model/loginmodel';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class ForgotpassComponent implements OnInit {

  LoginModel : LoginModel = new LoginModel();

  constructor(public ticketser:TicketService,public router : Router) { }

  ngOnInit() {

  }

  onSubmit() {

    
    if (this.LoginModel.Password != this.LoginModel.Confirmpassword)
    {
      alert("Password and Confirm Password are not Matching.");
    }
    else
    {
      this.ticketser.ValidateUser(this.LoginModel.UserId)
      .subscribe(
        (data) => {

            console.log(data);

            if ( data == null)
            {
              alert("UserId is incorrect.");
            }
            else
            {
              this.ticketser.UpdatePassword(this.LoginModel)
              .subscribe(
                (data) => {
                        alert("Password Updated Successfully.");
                        this.router.navigate(['/']);
              },error => {
              alert(error);
              console.log("Error Updating Password.", error);
            
              });
            }
          },error => {
            alert(error);
            console.log("Error Validating User.", error);
            
      });

    }
  }

}
