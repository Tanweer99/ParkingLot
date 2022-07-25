import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSlotComponent } from 'modules/user/add-slot/add-slot.component';
import { DeleteSlotComponent } from 'modules/user/delete-slot/delete-slot.component';
import { HomeComponent } from 'modules/user/home/home.component';
import { LoginComponent } from 'modules/user/login/login.component';
import { PageNotFoundComponent } from 'modules/user/page-not-found/page-not-found.component';
import { UpdateSlotComponent } from 'modules/user/update-slot/update-slot.component';

const routes: Routes = [
  {
    path : "addSlot", component : AddSlotComponent
  },
  {
    path : "home", component : HomeComponent
  },
  {
    path : "deleteSlot", component : DeleteSlotComponent
  },
  {
    path : "login/:page", component : LoginComponent, 
  },
  {
    path : "updateSlot", component : UpdateSlotComponent
  },
  {
    path: "", redirectTo : "home", pathMatch : "full"
  },
  {
    path : "**", component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
