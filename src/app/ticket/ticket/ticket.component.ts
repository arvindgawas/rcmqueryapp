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
  errortype : number ;
  fileToUpload: File = null;
  fileToUpload1: File = null;
  fileToUpload2: File = null;
  userrole : any;
  adminrole :boolean=false;
  errorexist : boolean=false;
  allclose : boolean=false;

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
         else
         {
            this.errortype = undefined;
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
         this.ticketmdoel.company = data.Company
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
             this.ticketmdoel.clientcode = data.clientcode;
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

 onFileChange(event) {
        if (event.target.files.length > 0) {
          this.fileToUpload = event.target.files[0];
            this.TicketService.postFile(this.fileToUpload,this.ticketmdoel.ticketno)
            .subscribe(
            (data) => {
                console.log(data)           
                },error => {
                    alert(error);
                    console.log("Error while uploading file.", error);
                });

        }
    }

 onFileChange1(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload1 = event.target.files[0];
          this.TicketService.postFile1(this.fileToUpload1,this.ticketmdoel.ticketno)
          .subscribe(
          (data) => {
              console.log(data)           
          },error => {
              alert(error);
              console.log("Error while uploading file.", error);
          });
    }
}

onFileChange2(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload2 = event.target.files[0];
          this.TicketService.postFile2(this.fileToUpload2,this.ticketmdoel.ticketno)
          .subscribe(
          (data) => {
              console.log(data)           
          },error => {
              alert(error);
              console.log("Error while uploading file.", error);
          });

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
    //let filep = filepath.replace('Z:/','//172.19.100.157/nfsrmsuat/')
    let filep = filepath.replace('Z:/','//rcmticketfsstoacc.file.core.windows.net/rcmticketfileshare/')
    let filen = "EmailBody"+ticketno+extn;
    this.TicketService.downloadDocFile(filep,filen);
}

downloadEmailAttachment(filepath : string,filename : string,ticketno : string)
{
    let extn = filename.substr(-5,5);
    //let filep = filepath.replace('Z:/','//172.19.100.157/nfsrmsuat/')
    let filep = filepath.replace('Z:/','//rcmticketfsstoacc.file.core.windows.net/rcmticketfileshare/')
    let filen = "EmailAttachemnt"+ticketno+extn;
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

 SendManualCloseResponse()
 {
    let stremailfrom = this.ticketmdoel.emailfrom +  "," + this.ticketmdoel.emailto.replace("rcm.opsquery@cms.com","");
    this._router.navigate(['/ticket/sendemail'],{ queryParams: { subject:this.ticketmdoel.emailsubject,ticketno:this.ticketmdoel.ticketno,emailbody:this.ticketmdoel.emailbody,emailfrom:stremailfrom,emailcc:this.ticketmdoel.emailcc,batchno:this.ticketmdoel.batchno,emailattachment:this.ticketmdoel.emailattachment,closecommit:'N'}});   
 }

updateticket()
{
    this.TicketService.UpdateTicket(this.ticketmdoel)
    .subscribe(
      (data) => {
          console.log(data);
          alert("Data Saved Successfully.") 
        
        if (this.ticketmdoel.status=="Close")
        {
            if (this.ticketmdoel.SendAutoCloseResponse=='N')
            {
                if (this.allclose)
                {
                    let stremailfrom = this.ticketmdoel.emailfrom +  "," + this.ticketmdoel.emailto.replace("rcm.opsquery@cms.com","");
                    this._router.navigate(['/ticket/sendemail'],{ queryParams: { subject:this.ticketmdoel.emailsubject,ticketno:this.ticketmdoel.ticketno,emailbody:this.ticketmdoel.emailbody,emailfrom:stremailfrom,emailcc:this.ticketmdoel.emailcc,batchno:this.ticketmdoel.batchno,emailattachment:this.ticketmdoel.emailattachment,closecommit:'Y'}});   
                }
                else
                {
                    this._router.navigate(['/ticket/all']);    
                }    
            }   
            else
            {
                this._router.navigate(['/ticket/all']);
            }
        }
        else
        {   
            if (this.ticketmdoel.errortype !=undefined)
            {     
                 //alert(this.ticketmdoel.mistakedoneby);   
                if (this.ticketmdoel.mistakedoneby =='' || this.ticketmdoel.mistakedoneby ==null || this.ticketmdoel.mistakedoneby ==undefined)    
                {
                    alert('Please Enter Mistake done by.');
                    return;
                }
                this._router.navigate(['/ticket/details/'+this.ticketmdoel.ticketno]); 
            }
            else
            {
                this._router.navigate(['/ticket/all']);
            }
            
        }
      },error => {
          alert(error);
          console.log("Error Saving Ticket Data.", error);
      });

}


onSubmit()
  {
     if (this.ticketmdoel.acceptstatus!= 'Accept')
     {
        alert("Please Accept the ticket First on Ticket Dashboard Page.");
        this._router.navigate(['/ticket/all']);
        return;
     }
     
     if (this.ticketmdoel.status=="Close")
        {
            this.TicketService.checkticketdata(this.ticketmdoel.ticketno)
            .subscribe(
            (data) => {
                console.log(data);
                if (data =='N')
                {
                    alert("Ticket Details are not entered. First Enter Ticket Details then Close the Ticket.")   
                    return;
                }
                else
                {
                    this.updateticketdata();
                }
                },error => {
                    alert(error);
                    console.log("Error checkticketdata.", error);
                });
        }
        else
        {
            this.updateticketdata();
        }   

     
}

   updateticketdata()
   {
    this.ticketmdoel.errortype= this.errortype;
    console.log(this.ticketmdoel);

    this.ticketmdoel.SendAutoCloseResponse='N';

    if (this.ticketmdoel.status=="Close")
    {
        this.TicketService.getticketclosecount(this.ticketmdoel.batchno)
        .subscribe(
        (data) => {
            console.log(data);
            if (data == "allclose")
            {
                this.allclose = true; 

                this.updateticket()

                /*
                if (confirm("Do You want to Send Auto Close Response?")) 
                {
                    this.ticketmdoel.SendAutoCloseResponse='Y';
                    this.updateticket()
                } 
                else
                {
                    this.updateticket()
                }
                */
            }
            else
            {
                this.updateticket()
            }           
        },error => {
            alert(error);
            console.log("Error while sending accept email.", error);
        });

    }
    else
    {
        this.updateticket();
    }
   }

}



/*   
    this.ticketmdoel.errortype= this.errortype;
    console.log(this.ticketmdoel);

    this.ticketmdoel.SendAutoCloseResponse='N';

    if (this.ticketmdoel.status=="Close")
    {
        this.TicketService.getticketclosecount(this.ticketmdoel.batchno)
        .subscribe(
        (data) => {
            console.log(data);
            if (data == "allclose")
            {
                this.allclose = true; 
                if (confirm("Do You want to Send Auto Close Response?")) 
                {
                    this.ticketmdoel.SendAutoCloseResponse='Y';
                    this.updateticket()
                } 
                else
                {
                    this.updateticket()
                }
            }
            else
            {
                this.updateticket()
            }           
        },error => {
            alert(error);
            console.log("Error while sending accept email.", error);
        });

    }
    else
    {
        this.updateticket();
    }
    */