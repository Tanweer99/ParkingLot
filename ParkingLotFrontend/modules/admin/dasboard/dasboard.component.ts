import { Component, OnInit } from '@angular/core';
import { SlotService } from 'src/service/slot.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(private slotService : SlotService) { }

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

    
   CreateSlot(){
     this.slotService.CreateSlots().subscribe(
       (res) => {
         if(res == true){
           alert("Slot created succesfully!");
           window.location.reload();
         }else{
           alert("something went wrong!");
         }
       },
       (err) => console.log(err)
     )
   }

   DeleteSlot(){
     this.slotService.DeleteSlot(this.totalSlots).subscribe(
      (res) => {
        if(res == true){
          alert("Slot Deleted succesfully!");
          window.location.reload();
        }else{
          alert("something went wrong!");
        }
      },
      (err) => console.log(err)
    )
   }
}
