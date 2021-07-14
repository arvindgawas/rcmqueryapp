import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'ticket', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)},
  { path: 'userexam', loadChildren: () => import('./examuser/examuser.module').then(m => m.ExamuserModule)},
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule)},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
