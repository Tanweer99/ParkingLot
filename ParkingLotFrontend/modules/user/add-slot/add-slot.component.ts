import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookSlotService } from 'src/service/book-slot.service';
import { SlotService } from 'src/service/slot.service';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {

  constructor(private bookSlotService : BookSlotService, private slotService : SlotService) { }

  bookSlotForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    vehicleNumber : new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$"), Validators.maxLength(10)]),
    slotNumber : new FormControl('0', [Validators.required]),
    entryTime : new FormControl('', [Validators.required]),
    exitTime : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    
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
            // this.bookSlotForm.patchValue({slotNumber : 0})
            this.bookSlotService.AddSlot(this.bookSlotForm.value).subscribe(
              (res) => {
                  this.slotNumber = res.slotNumber;
                  alert(`Booked Slot Number ${this.slotNumber} successfully`);
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
