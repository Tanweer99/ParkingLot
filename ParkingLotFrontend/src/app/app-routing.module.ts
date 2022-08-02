import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSlotComponent } from 'modules/user/add-slot/add-slot.component';
import { DeleteSlotComponent } from 'modules/user/delete-slot/delete-slot.component';
import { HomeComponent } from 'modules/user/home/home.component';
import { LoginComponent } from 'modules/authentication/login/login.component';
import { PageNotFoundComponent } from 'modules/user/page-not-found/page-not-found.component';
import { UpdateSlotComponent } from 'modules/user/update-slot/update-slot.component';
import { SignupComponent } from 'modules/authentication/signup/signup.component';
import { DasboardComponent } from 'modules/admin/dasboard/dasboard.component';
import { AuthGuardGuard } from 'src/auth/auth-guard.guard';
const routes: Routes = [
  {
    path : "addSlot", component : AddSlotComponent
  },
  {
    path : "home", component : HomeComponent, canActivate: [AuthGuardGuard]
  },
  {
    path : "deleteSlot", component : DeleteSlotComponent
  },
  {
    path : "updateSlot", component : UpdateSlotComponent
  },
  {
    path: "dashboard" , component: DasboardComponent
  },
  {
    path : "signup", component: SignupComponent
  },
  {
    path : "signin" , component: LoginComponent
  },
  {
    path: "", redirectTo : "signin", pathMatch : "full"
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
