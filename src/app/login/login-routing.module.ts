import { Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { RouterModule } from  '@angular/router';
import { LoginComponent  } from './login/login.component';
import { ForgotpassComponent} from './forgotpass/forgotpass.component'

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'forgot', component: ForgotpassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }