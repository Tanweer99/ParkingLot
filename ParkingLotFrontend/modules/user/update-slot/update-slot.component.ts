import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookSlotService } from 'src/service/book-slot.service';

@Component({
  selector: 'app-update-slot',
  templateUrl: './update-slot.component.html'
})
export class UpdateSlotComponent implements OnInit {

  constructor(private route : Router, private bookSlotService : BookSlotService) { }
  
  disabled = true
  showdiv=false
  email:any

  updateSlotForm = new FormGroup({

    name : new FormControl('', [Validators.required]),
    vehicleNumber : new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$"), Validators.maxLength(10)]),
    slotNumber : new FormControl('0', [Validators.required]),
    entryTime : new FormControl('', [Validators.required]),
    exitTime : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {

    this.updateSlotForm.patchValue({
      name : localStorage.getItem('name'),
      vehicleNumber : localStorage.getItem('vehicleNumber'),
      slotNumber : localStorage.getItem('slotNumber'),
      entryTime : localStorage.getItem('entryTime'),
      exitTime : localStorage.getItem('exitTime'),
    });

    if(localStorage.getItem('id')==null){
      this.showdiv=true
    }
    else{
      this.showdiv=false
    }
    this.email = localStorage.getItem('email')

  }

  onFormSubmit(){

    this.bookSlotService.UpdateUserBookedSlot(localStorage.getItem('id'), this.updateSlotForm.value,this.email).subscribe(
      (res) => {
        if(res) {
          alert('Your Slot updated Successfully!')
        }
        else{
          alert('Something went wrong!');
        }
      },
      (err) => { console.log(err); }
    )
  }

  
}
