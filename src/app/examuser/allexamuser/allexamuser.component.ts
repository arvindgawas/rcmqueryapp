import { Component, OnInit, ViewChild } from '@angular/core';
import { user} from '../../model/user'
import { TicketService } from '../../ticket.service'
import { Router } from '@angular/router';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-allexamuser',
  templateUrl: './allexamuser.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})

export class AllexamuserComponent implements OnInit {

  lstuser: user[]=[];
  
  dataSource: any;

  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['UserId','UserName','UserRole', 'EditAction','DeleteAction'];

  constructor(public TicketService: TicketService, public _router : Router ) { }

  ngOnInit() {
    
    this.TicketService.GetAllUser()
    .subscribe(
     (data) => {
         this.lstuser = data;
         this.dataSource = new MatTableDataSource(this.lstuser );
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
     },error => {
         alert(error);
         console.log("Error getting dashboard count.", error);
     });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  Delete(UserID:Number,ExamId:Number)
  {
    if (confirm("Are you sure to delete User ?")) {
      this.TicketService.DeleteUser(UserID).subscribe
          (
          response => {
            alert('Deleted User Successfully');
            this.ngOnInit();
      
              /*
              if (response.StatusCode == "200") {
                  alert('Deleted User Successfully');
                  //location.reload();
                  this.ngOnInit();
              }
              else {
                  alert('Something Went Wrong');
                  this._router.navigate(['/usermaster/alluser']);
              }
              */
          }
          )
    }
  }

}










