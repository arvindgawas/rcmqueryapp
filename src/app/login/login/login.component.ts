import { Component, OnInit } from '@angular/core';
import { ticketlogin } from '../../model/ticketlogin';
import { Router}  from '@angular/router';
import { TicketService } from '../../ticket.service';
import { ValidloginService} from '../../validlogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class LoginComponent implements OnInit {

  LoginModel:ticketlogin= new ticketlogin();

  constructor( public router : Router,public ticketser:TicketService, public valloginser : ValidloginService ) 
  { 
  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  onSubmit() {
    
    let strpassword : string = '';
    strpassword = this.LoginModel.Password;

    this.ticketser.ValidateUser(this.LoginModel.UserId)
    .subscribe(
        (data) => {

            this.LoginModel = data;
            console.log(data);

            if ( data.Password != strpassword)
            {
               alert("Invalid UserID and Password.");  
               this.router.navigate(['/']);
            }
            else
            {
                localStorage.setItem('currentUser', JSON.stringify({ name: this.LoginModel.UserId }));
                localStorage.setItem('userrole', JSON.stringify({ userrole: this.LoginModel.userrole }));
                localStorage.setItem('datefilter', JSON.stringify({ datefilter: new Date()}));

                this.valloginser.validateLoginUser();
                this.valloginser.toggle();
                this.router.navigate(['/ticket/all']);
            }
          },error => {
            alert(error);
            console.log("Error Validating User.", error);
            
      });
      
  }
}
