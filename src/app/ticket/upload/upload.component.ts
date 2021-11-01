import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../ticket.service'


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class UploadComponent implements OnInit {
  fileToUpload: File = null;
  filepath : string;
  filename : string;

  constructor(public TicketService: TicketService, public _router : Router) { }

  ngOnInit() {
  }

  downloadDocFile()
 {
  //this.filepath ="F:/rcmquery/uploadtemplates/crnupload.xls";
  this.filepath = "E:/productionapps/rcmquery/uploadtemplates/crnupload.xls";
  this.filename = 'crnupload.xls';
   this.TicketService.downloadDocFile(this.filepath,this.filename);
 }

 downloadDocFileCloseOld()
 {
  this.filepath ="F:/rcmquery/uploadtemplates/ticketclosure.xls";
  this.filename = 'ticketclosure.xls';
   this.TicketService.downloadDocFile(this.filepath,this.filename);
 }

 downloadDocFileClose()
  {
       this.TicketService.downloadExcelFileClose();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }

    
  } 

  onFileSubmit()
  {
    this.TicketService.postExcelFile(this.fileToUpload)
        .subscribe(
        (data) => {
           alert("Data Uploaded Successfully.");
           this.ngOnInit();
            console.log(data)           
        },error => {
            alert(error);
            console.log("Error while uploading file.", error);
        });
  }
  
  

  onFileChangeClose(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }

  }  

  onCloseSubmit()
  {
    this.TicketService.postExcelFileClose(this.fileToUpload)
    .subscribe(
    (data) => {
      if (data =="Close")
      {
        alert("This Batch is Already Closed.");
      }  
      else if (data =="Batch")
      {
        alert("Batch No & Ticket No Mismatch.");
      }
      else if (data =="Ticket")
      {
        alert("Ticket No Mismatch.");
      }
      else if (data =="CRN")
      {
        alert("Ticket CRN No Mismatch.");
      }
      else if (data =="Accept")
      {
        alert("Ticket is not Accepted yet. Only Accepted Ticket can be closed.");
      }
      else
      {
        alert("Data Uploaded Successfully.");
      }
       this.ngOnInit();
       console.log(data)           
    },error => {
        alert(error);
        console.log("Error while uploading file.", error);
    });

  }


  


}
