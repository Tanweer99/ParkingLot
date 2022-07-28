import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookSlotService } from 'src/service/book-slot.service';
import { SlotService } from 'src/service/slot.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {

  constructor(private bookSlotService : BookSlotService, private slotService : SlotService, private route:Router) { }

  bookSlotForm = new FormGroup({

    name : new FormControl('', [Validators.required]),
    vehicleNumber : new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$"), Validators.maxLength(10)]),
    slotNumber : new FormControl('0', [Validators.required]),
    entryTime : new FormControl('', [Validators.required]),
    exitTime : new FormControl('', [Validators.required])

  });

  email:any

  ngOnInit(): void {

    this.email = localStorage.getItem('email')

  }

  slotNumber : any
  numberOfAvailableSlots : any
  getEntryDateTime : any
  displayErrorMessage = false

  onFormSubmit(){

    this.slotService.CountAvailableSlot().subscribe(
      (res) => {
          this.numberOfAvailableSlots = res.count; 
          if(this.numberOfAvailableSlots > 0)
          {
            this.bookSlotService.AddSlot(this.bookSlotForm.value,this.email).subscribe(
              (res) => {
                  localStorage.setItem('id', res.userSlot.id);
                  localStorage.setItem('name', res.userSlot.name);
                  localStorage.setItem('vehicleNumber', res.userSlot.vehicleNumber);
                  localStorage.setItem('slotNumber', res.userSlot.slotNumber);
                  localStorage.setItem('entryTime', res.userSlot.entryTime);
                  localStorage.setItem('exitTime', res.userSlot.exitTime);
                  alert(`Booked Slot Number ${localStorage.getItem('slotNumber')} successfully`);
                  window.location.reload();
              },
              (err) => { console.log(err); }
            )
          }
          else{
            alert("Sorry! All Slots are booked.");
          }
      },
      (err) => { console.log(err); }
    )
  }


  calculateDateDuration(startDate:any, endDate:any){
    var timeDifference = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000);
    timeDifference /= 60;
    return (Math.round(timeDifference));
  }


  setEntryDateTime(event:any){
    this.getEntryDateTime = event.target.value;
  }

  
  checkDateTime(event : any){
    var timeDifference = this.calculateDateDuration(this.getEntryDateTime, event.target.value);
    if(timeDifference <= 0){
      this.displayErrorMessage = true;
    }else{
      this.displayErrorMessage = false;
    }
  }

}
