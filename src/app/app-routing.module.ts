import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddParticipantComponent} from './add-participant/add-participant.component'
import {AdminComponent} from "./admin/admin.component";


const routes: Routes = [{
  path: 'add-participant', component: AddParticipantComponent
}, {
  path: 'admin', component: AdminComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
