import { Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { RouterModule } from  '@angular/router';
import { AllexamuserComponent  } from './allexamuser/allexamuser.component';
import { AddexamuserComponent} from './addexamuser/addexamuser.component';
import { EditexamuserComponent} from './editexamuser/editexamuser.component';
import { AddbankComponent } from './addbank/addbank.component';

const routes: Routes = [
    { path: '', component: AllexamuserComponent },
    { path: 'addbank', component: AddbankComponent },
    { path: 'add', component: AddexamuserComponent },
    { path: 'edit/:ID', component: EditexamuserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExamUserRoutingModule { }