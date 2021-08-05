
import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../ticket.service'
import { Router } from '@angular/router';
import { bank} from '../../model/bank'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-allbank',
  templateUrl: './allbank.component.html',
  styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
  '../../Content/vendor/metisMenu/metisMenu.min.css',
  '../../Content/dist/css/sb-admin-2.css',
  '../../Content/vendor/font-awesome/css/font-awesome.min.css']
})
export class AllbankComponent implements OnInit {

  dataSource: any;
  banklist: bank[]=[];
 
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['bankname'];

  constructor(public TicketService: TicketService, public _router : Router ) { }

  ngOnInit() {

    this.TicketService.GetAllBanks()
    .subscribe(
     (data) => {
         //console.log(data);
         this.banklist = data;
         console.log(this.banklist);
         this.dataSource = new MatTableDataSource(this.banklist);
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


}
