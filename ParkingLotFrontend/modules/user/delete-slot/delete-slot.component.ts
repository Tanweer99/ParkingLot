import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookSlotService } from 'src/service/book-slot.service';

@Component({
  selector: 'app-delete-slot',
  templateUrl: './delete-slot.component.html'
})
export class DeleteSlotComponent implements OnInit {

  constructor(private route : Router, private bookSlotService : BookSlotService) { }

  id : any
  name : any;
  vehicleNumber :any
  slotNumber : any
  entryTime : any
  exitTime : any
  toPay : any
  timeDuration : any

  showdiv=false

  ngOnInit(): void {

    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.vehicleNumber = localStorage.getItem('vehicleNumber'),
    this.slotNumber = localStorage.getItem('slotNumber'),
    this.entryTime = localStorage.getItem('entryTime'),
    this.exitTime = localStorage.getItem('exitTime')
    this.toPay = Math.round(this.calculateDateDuration(this.entryTime, this.exitTime) * (0.10));

    if(this.id == null){
      this.showdiv=true
    }
    else{
      this.showdiv=false;
    }

  }


  ExitSlot(){
    this.bookSlotService.DeleteSlot(this.id).
    subscribe(
      (res) => {
        if(res == true)
        {
          alert('Exited Successfully!');
          this.route.navigate(['home']);
          localStorage.clear();
          window.location.reload()
        }
        else{
          alert('Some went wrong!');
        }
      },
      (err) => { console.log(err); }
    )

  }


  calculateDateDuration(startDate:any, endDate:any){
    var timeDifference = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000);
    timeDifference /= 60;
    return Math.abs(Math.round(timeDifference));
  }
  
}
