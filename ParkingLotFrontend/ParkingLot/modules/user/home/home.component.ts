import { Component, OnInit } from '@angular/core';
import { SlotService } from 'src/service/slot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private slotService : SlotService) { }
 
  totalSlots = 10
  availableSlots : any
  bookedSlots : any

  ngOnInit(): void {
    this.slotService.CountAvailableSlot().subscribe(
      (res) => {
        this.availableSlots = res.count;
        this.bookedSlots = this.totalSlots - res.count;
      },
      (err) => { console.log(err); }
    )
  }

}
