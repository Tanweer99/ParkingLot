import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DasboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
