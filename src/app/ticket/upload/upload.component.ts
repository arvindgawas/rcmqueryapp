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

  constructor(public TicketService: TicketService, public _router : Router) { }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }

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

    this.TicketService.postExcelFileClose(this.fileToUpload)
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


}
