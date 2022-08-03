import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UpdateSlotComponent } from './update-slot/update-slot.component';
import { AddSlotComponent } from './add-slot/add-slot.component';
import { DeleteSlotComponent } from './delete-slot/delete-slot.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


@NgModule({
  declarations: [
    HomeComponent,
    UpdateSlotComponent,
    AddSlotComponent,
    DeleteSlotComponent,
    PageNotFoundComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    AddSlotComponent
  ]
})
export class UserModule { }
