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
 
  numberOfAvailableSlots : any
  totalSlots :any
  availableSlots : any
  bookedSlots :any

  ngOnInit(): void {
    this.slotService.TotalSlots().subscribe(
      (res) => {
        this.totalSlots = res.totalSlots 
        this.slotService.CountAvailableSlot().subscribe(
          (res) => {
              this.availableSlots = res.count;
              this.bookedSlots = this.totalSlots - res.count;
          }
        )
      }
    )
    
   }


  onlogout(){
     localStorage.clear();
     this.router.navigate(['signin']);
  }

  OnresetPasswordClick(){
    this.router.navigate(['resetPassword']);
  }

}
