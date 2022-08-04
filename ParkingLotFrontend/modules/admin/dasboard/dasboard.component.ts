import { Component, OnInit } from '@angular/core';
import { SlotService } from 'src/service/slot.service';
import { BookSlotService } from 'src/service/book-slot.service';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(private slotService : SlotService, private bookedservice:BookSlotService) { }

  totalSlots :any
  availableSlots : any
  bookedSlots :any
  bookedslotlist: any
  showtable = true

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
 
    this.bookedservice.BookedSlotsList().subscribe(
      (res) =>{
          if(res != null){
            this.showtable=true;
            this.bookedslotlist = res;
          } 
          else{
            this.showtable = false;
            this.bookedslotlist= res;
          }
      },
      (err) => console.log(err)
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

     this.slotService.CheckSlot(this.totalSlots).subscribe(
      (res) => {
        if(res ==true){
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
        else{
          alert('Slot is already booked.Cannot be deleted!!');
        }
      },
      (err) => console.log(err)
     )
     
   }
}
