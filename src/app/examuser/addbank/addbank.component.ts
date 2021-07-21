import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../ticket.service'


@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class AddbankComponent implements OnInit {

  bankname : string;
  constructor(public TicketService: TicketService, public _router : Router) { }

  ngOnInit() {
  }

  onSubmit()
  {
    this.TicketService.AddBank(this.bankname)
    .subscribe(
      (data) => {
          console.log(data);
          alert("Data Saved Successfully.") 
          this._router.navigate(['/ticket/all']);
      },error => {
          alert(error);
          console.log("Error Saving Spares", error);
      });
  }


}
