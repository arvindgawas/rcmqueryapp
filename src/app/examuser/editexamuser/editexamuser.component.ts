import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TicketService } from '../../ticket.service'
import { user} from '../../model/user'
import { userbankmap} from '../../model/user'

@Component({
  selector: 'app-editexamuser',
  templateUrl: './editexamuser.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class EditexamuserComponent implements OnInit {

  user: user = new user();
  Id : any;
  lstuserbankmap : userbankmap[]=[]; 
  lstuserbankmapall : userbankmap[]=[];
  lstuserbankmapsaved : userbankmap[]=[];

  constructor(public TicketService: TicketService, public _router : Router,private _routeParams: ActivatedRoute) { }

  ngOnInit() {

    this.Id = this._routeParams.snapshot.params['ID'];    

    this.TicketService.GetUser(this.Id )
    .subscribe(
     (data) => {

          this.user = data;
          this.lstuserbankmapsaved = data.lstuserbankmap;
          

          this.TicketService.GetUserBankMaster()
          .subscribe(
          (data) => {

                this.lstuserbankmapall = data;
                console.log(545454);
                console.log(this.lstuserbankmapall);


                for (var objum of this.lstuserbankmapsaved)
                {
                      if (this.lstuserbankmapall.some(a => a.Bank ==  objum.Bank ) )
                      {
                        this.lstuserbankmapall = this.lstuserbankmapall.filter( a=> a.Bank!= objum.Bank);
                        console.log(111111);
                        console.log(this.lstuserbankmapall);
                        console.log(22222);  
                      }
                }
                
                for (var objum of this.lstuserbankmapsaved)
                {
                    this.lstuserbankmapall.push(objum);
                }       
                console.log(this.lstuserbankmapall);

                this.lstuserbankmapall.sort((a, b) => {
                  return this.compareObjects(a, b, 'Bank')
                })

                this.lstuserbankmap = this.lstuserbankmapall;

              },error => {
              alert(error);
              console.log("Error getting dashboard count.", error);
          });
       
     },error => {
         alert(error);
         console.log("Error getting dashboard count.", error);
     });

     
  }

  ValidatePriorityUser(objum :userbankmap,userid : string)
  {
        console.log(objum.UserPriority);

      if (objum.UserPriority =="1")
      {
        this.TicketService.ValidatePriorityUser(objum,userid)
        .subscribe(
          (data) => {
              console.log(data);
              if (data >0)
              {
                alert("Already user with Priority 1 exist for tbis Bank and QueryType.")
                objum.UserPriority="";
              }
              
          },error => {
             alert(error);
              console.log("Error ValidatePriorityUser", error);
          });
      }
  }

  compareObjects(object1, object2, key) {
    const obj1 = object1[key].toUpperCase()
    const obj2 = object2[key].toUpperCase()
  
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
  }


  onSubmit()
  {
    this.user.lstuserbankmap = this.lstuserbankmap;
    this.TicketService.UpdateUser(this.user)
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














