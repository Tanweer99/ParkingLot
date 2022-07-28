import { Component, OnInit } from '@angular/core';
import { BookSlotService } from 'src/service/book-slot.service';
import { SlotService } from 'src/service/slot.service';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private slotService : SlotService, private router: Router, private bookSlotService:BookSlotService) { }
 
  //slotNumber : any
  numberOfAvailableSlots : any
  //getEntryDateTime : any
  //displayErrorMessage = false
  //email:any
  //disabled = true
  //id : any
  //name : any;
  //vehicleNumber :any
  //entryTime : any
  //exitTime : any
  //toPay : any
  //timeDuration : any
  totalSlots = 10
  availableSlots : any
  bookedSlots :any

  ngOnInit(): void {
    this.slotService.CountAvailableSlot().subscribe(
      (res) => {
          this.availableSlots = res.count;
          this.bookedSlots = this.totalSlots - res.count;
      }
    )

    // this.email = localStorage.getItem('email')
    // this.id = localStorage.getItem('id');
    // this.name = localStorage.getItem('name');
    // this.vehicleNumber = localStorage.getItem('vehicleNumber'),
    // this.slotNumber = localStorage.getItem('slotNumber'),
    // this.entryTime = localStorage.getItem('entryTime'),
    // this.exitTime = localStorage.getItem('exitTime')
   }
  onlogout(){
    localStorage.clear();
     this.router.navigate(['signin']);
  }
}
