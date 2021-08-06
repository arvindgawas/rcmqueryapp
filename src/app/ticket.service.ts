import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClientModule ,HttpClient, HttpErrorResponse, HttpParams ,HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from '../environments/environment';
import { ticketmdoel } from './model/ticketmodel';
import { rcmdetail } from './model/rcmdetail';
import { ticketcount } from './model/ticketcount';
import { LoginModel} from './model/loginmodel';
import { user } from './model/user';
import { email } from './model/email';
import { ticketdetails} from './model/ticketdetails';
import { ticketlogin} from './model/ticketlogin';
import { errortype,Userdd,ddlist } from './model/errortype';
import { userbankmap} from './model/user';
import { report} from './model/report';
import {formatDate} from '@angular/common';
import {ddlisttracker,customer,User} from './model/reportddlist';

import { ticketRoutingModule } from './ticket/ticket-routing.module';

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  
  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File,ticketno:string): Observable<boolean> 
  {
    let url= environment.apiEndpoint+"ticket/UploadFile";
        const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('ticketno', ticketno); 
    return this.http.post<any>(url,formData).pipe(tap(data => data),
    catchError(this.handleError));
  }

  postExcelFileClose(fileToUpload: File): Observable<boolean> 
  {
    let url= environment.apiEndpoint+"ticket/UploadBulkTickeClose";
     const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any>(url,formData).pipe(tap(data => data),
    catchError(this.handleError));
  }

  postExcelFile(fileToUpload: File): Observable<boolean> 
  {
    let url= environment.apiEndpoint+"ticket/UploadExcelFile";
     const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any>(url,formData).pipe(tap(data => data),
    catchError(this.handleError));
  }



  public downloadnew(filepath : string,filename : string)
  {
    let url= environment.apiEndpoint+"ticket/Downloadnew";

    const param = new HttpParams({});
    const params = new HttpParams().set('filepath', filepath).set('filneame',filename);

    return this.http.get<any>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));
  }


  downloadExcelFileold(ticketno  : string)
  {
    let url= environment.apiEndpoint+"ticket/Downloadexelfile";
    
    const param = new HttpParams({});
    const params = new HttpParams().set('ticketno', ticketno);
    const options = {params, responseType: 'blob' as 'blob'};

     this.http.get(url,options)
     .subscribe((Response)=>{
      console.log(95959595);
       console.log(Response);
       var a = document.createElement("a");
       let blob = new Blob([Response], { type: "application/octet-stream"});
       a.href = URL.createObjectURL(blob);
       a.download = "TicketTracker.csv";
       // start download
       a.click();
     })
  }

  downloadExcelFile(report  : report)
  {
    let url= environment.apiEndpoint+"ticket/Downloadexelfile";

    let sfromdate = formatDate(report.fromdate, 'yyyy/MM/dd', 'en');
    let stodate = formatDate(report.todate, 'yyyy/MM/dd', 'en');

    console.log(report);
    
    const param = new HttpParams({});
    const params = new HttpParams().set('fromdate', sfromdate).set('todate',stodate)
    .set('customer',report.customer).set('user',report.user).set('customertype',report.customertype)
    .set('region',report.region).set('location',report.location).set('hublocation',report.hublocation)
    .set('cdpncm',report.cdpncm).set('issuetype',report.issuetype).set('sla',report.sla);
     const options = {params, responseType: 'blob' as 'blob'};
    this.http.get(url,options)
     .subscribe((Response)=>{
      console.log(95959595);
       console.log(Response);
       var a = document.createElement("a");
       let blob = new Blob([Response], { type: "application/octet-stream"});
       a.href = URL.createObjectURL(blob);
       a.download = "TicketTracker.xls";
       // start download
       a.click();
     })
  }



  downloadDocFile(filepath : string,filename : string)
  {
    let url= environment.apiEndpoint+"ticket/DownloadFile";
    
    const param = new HttpParams({});
    const params = new HttpParams().set('filepath', filepath).set('filneame',filename);

    const options = {params, responseType: 'blob' as 'blob'};

    //return this.http.get(url,options)
     //.subscribe(response => this.downLoadFile(response, "application/octet-stream"))

     this.http.get(url,options)
     .subscribe((Response)=>{
      console.log(95959595);
       console.log(Response);
       var a = document.createElement("a");
       let blob = new Blob([Response], { type: "application/octet-stream"});
       a.href = URL.createObjectURL(blob);
       a.download = filename;
       // start download
       a.click();
     })

  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
}

  public getddlist(querytype : string)
  {
    let url= environment.apiEndpoint+"ticket/getddlist";

    const param = new HttpParams({});
    const params = new HttpParams().set('querytype', querytype);

    return this.http.get<ddlist>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public gettrackerddlist()
  {
    let url= environment.apiEndpoint+"ticket/getddlisttracker";
    
    return this.http.get<ddlisttracker>(url).pipe(tap(data => data),
    catchError(this.handleError));
  }
  

  public getdashboardcount(userid : string, dtticketdate : string,adminuser:string )
  {

    let url :string;
    console.log(adminuser);
    if (adminuser.includes("admin"))
    {
      url= environment.apiEndpoint+"ticket/getadmindashboardcount";
    }
    else
    {
      url= environment.apiEndpoint+"ticket/getdashboardcount";
    }
    const param = new HttpParams({});
    const params = new HttpParams().set('userid', userid).set('dtticketdate', dtticketdate);

    return this.http.get<ticketcount[]>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));

  }

  public ValidateUser(ID:any)
  {
    let userpass : string ='';
    let url= environment.apiEndpoint+"ticket/ValidateUser/"+ID;
    return this.http.get<ticketlogin>(url).pipe(tap(data => data),
    catchError(this.handleError));
  }


  public GetEmailHistory(ticketno :string)
  {
    let url= environment.apiEndpoint +"Ticket/GetEmailHistory";

    const param = new HttpParams({});
    const params = new HttpParams().set('ticketno', ticketno);
    
    return this.http.get<email[]>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));

  }

  ProcessTAT(datefilter : string)
  {
    let url= environment.apiEndpoint +"Ticket/ProcessTAT";

    const param = new HttpParams({});
    const params = new HttpParams().set('datefilter', datefilter);
    
    return this.http.get<email[]>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public SendEmail(objemail : email)
  {
    let url= environment.apiEndpoint + "ticket/sendlocationemail";

    console.log(objemail);

    return this.http.post<any>(url,objemail).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public GetUserBankMaster()
  {
    let url= environment.apiEndpoint +"UserMaster/GetUserBankMaster";
    
    return this.http.get<userbankmap[]>(url).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public ValidatePriorityUser(objum:userbankmap,userid:string)
  {

    let url= environment.apiEndpoint +"UserMaster/ValidatePriorityUser";

    const param = new HttpParams({});
    const params = new HttpParams().set('bank', objum.Bank).set('querytype',objum.QueryType).set('userid',userid);

    return this.http.get<number>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public GetAllUser()
  {
    let url= environment.apiEndpoint + "UserMaster/GetAllUser";

    return this.http.get<user[]>(url).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public GetUser(ID:any)
  {
    let url= environment.apiEndpoint +"UserMaster/GetUser/"+ID;
    
    return this.http.get<user>(url).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public DeleteUser(ID:any)
  {
    let url= environment.apiEndpoint +"UserMaster/DeleteUser/"+ID;
      return this.http.delete<any>(url).pipe(tap(data => data),
      catchError(this.handleError));
  }

  public UpdateUser(objuser : user)
  {

    let url= environment.apiEndpoint + "UserMaster/UpdateUser/";
     console.log(888899999);
     console.log(objuser);
      return this.http.post<any>(url, objuser).pipe(tap(data => data),
              catchError(this.handleError)
              );

  }

  public UpdatePassword(objuser : LoginModel)
  {

    let url= environment.apiEndpoint + "UserMaster/UpdatePassword/";
     console.log(888899999);
     console.log(objuser);
      return this.http.post<any>(url, objuser).pipe(tap(data => data),
              catchError(this.handleError)
              );

  }

  public AddBank(bankname : string)
  {
    let url= environment.apiEndpoint + "UserMaster/AddBank/";

    const param = new HttpParams({});
    const params = new HttpParams().set('bankname', bankname);

  
      return this.http.get<any>(url,{params}).pipe(tap(data => data),
              catchError(this.handleError)
              );

  }

  public GetAllBanks()
  {
    let url= environment.apiEndpoint + "UserMaster/GetAllBanks/";
  
      return this.http.get<any>(url).pipe(tap(data => data),
              catchError(this.handleError)
              );

  }

  public SaveUser(objuser : user)
  {

    let url= environment.apiEndpoint + "UserMaster/SaveUser/";

      return this.http.post<any>(url, objuser).pipe(tap(data => data),
              catchError(this.handleError)
              );

  }

  public GetAllTickets(userid : string,userrole : string)
  {
    let url= environment.apiEndpoint + "Ticket/GetAllTickets";

    console.log(99999);
    console.log(userrole);

    const param = new HttpParams({});
    const params = new HttpParams().set('userid', userid).set('userrole',userrole);

    return this.http.get<ticketmdoel[]>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));

  }

  public Sendacceptemail(batchno : string)
  {

    console.log(batchno);
    let url= environment.apiEndpoint + "Ticket/Sendacceptemail";

    const param = new HttpParams({});
    const params = new HttpParams().set('batchno', batchno);

    return this.http.get<ticketmdoel[]>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));

  }

  public getticketclosecount(batchno : string)
  {

    console.log(batchno);
    let url= environment.apiEndpoint + "Ticket/getticketclosecount";

    const param = new HttpParams({});
    const params = new HttpParams().set('batchno', batchno);

    return this.http.get<string>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));

  }

  

  public GetAllTicketsfordate(datefilter : string,userid:string,userrole : string,filter :string)
  {
    console.log(datefilter);
    console.log(userid);

    let url= environment.apiEndpoint + "Ticket/GetAllTicketsfordate";

    const param = new HttpParams({});
    const params = new HttpParams().set('datefilter', datefilter).set('userid', userid).set('userrole',userrole).set('filter',filter);

    return this.http.get<ticketmdoel[]>(url,{params}).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public Getcrnno(customer : string,pickupcode : string,clientcode : string)
  {
    let url= environment.apiEndpoint +"Ticket/getcrnno/"

    const param = new HttpParams({});
    const params = new HttpParams().set('customer', customer).set('pickupcode', pickupcode).set('clientcode',clientcode);
    return this.http.get<rcmdetail>(url, {params}).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public Getrcmdata(crnno : string,clientcode : string)
  {
    let url= environment.apiEndpoint +"Ticket/getrcmdata/"

    const param = new HttpParams({});
    const params = new HttpParams().set('crnno', crnno).set('clientcode',clientcode);
    return this.http.get<rcmdetail>(url, {params}).pipe(tap(data => data),
    catchError(this.handleError));
  }

  public GetTicket(ID:any)
  {
    let url= environment.apiEndpoint +"Ticket/GetTicket/"+ID;
    
    return this.http.get<ticketmdoel>(url).pipe(tap(data => data),
    catchError(this.handleError));
  }

  
  public GetTicketdetails(ID:any)
  {
    let url= environment.apiEndpoint +"Ticket/GetTicketDetails/"+ID;
    
    return this.http.get<ticketdetails[]>(url).pipe(tap(data => data),
    catchError(this.handleError));
  }

  

  public AddTicket(objticketmdoel:ticketmdoel)
  {
    let url= environment.apiEndpoint +"Ticket/InsertTicket";

    return this.http.post<any>(url, objticketmdoel).pipe(tap(data => data),
              catchError(this.handleError)
              );
  }

  public   InsertTiketDetails(objlst:ticketdetails[])
  {
    let url= environment.apiEndpoint +"Ticket/InsertTicketDetails";

    return this.http.post<any>(url, objlst).pipe(tap(data => data),
              catchError(this.handleError)
              );
  }


  public UpdateTicket(objticketmdoel:ticketmdoel)
  {
    let url= environment.apiEndpoint +"Ticket/UpdateTicket";

    return this.http.put<any>(url, objticketmdoel).pipe(tap(data => data),
              catchError(this.handleError)
              );
  }

  public SendCloseResponse(objticketmdoel:ticketmdoel)
  {
    let url= environment.apiEndpoint +"Ticket/SendCloseResponse";

    return this.http.put<any>(url, objticketmdoel).pipe(tap(data => data),
              catchError(this.handleError)
              );
  }


  public  UpdateTicketAccept(objlst:ticketmdoel[])
  {
    let url= environment.apiEndpoint +"Ticket/UpdateTicketAccept";

    return this.http.put<any>(url, objlst).pipe(tap(data => data),
              catchError(this.handleError)
              );
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.error.message);
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };


}

