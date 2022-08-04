import { Component, OnInit } from '@angular/core';
import { SlotService } from 'src/service/slot.service';
import { BookSlotService } from 'src/service/book-slot.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $ : any;

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
  currentbookslotid:any
  currentUpdatedUserEmail : any
  showSlotMessage = false
  displayErrorMessage = false
  getEntryDateTime : any

  updateSlotForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    vehicleNumber : new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$"), Validators.maxLength(10)]),
    slotNumber : new FormControl('', [Validators.required]),
    entryTime : new FormControl('', [Validators.required]),
    exitTime : new FormControl('', [Validators.required])
  });


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
        console.log(res);
        
          if(res.length > 0){
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



  //Slot info Modal
  OpenSlotInfoModal(){
    $('#slotInfo').modal('show');
  } 

  
  //  User Delete
  openDeclineModal(bookedslotid:any){
    this.currentbookslotid=bookedslotid;
    $('#deleteModal').modal('show');
  }
  
  onDeletebtn(currentbookslotid:any){
     this.bookedservice.DeleteSlot(currentbookslotid).subscribe(
      (res) => {
        if(res == true)
        {
          alert('Deleted Successfully!');
          window.location.reload()
        }
        else{
          alert('Some went wrong!');
        }
      },
      (err) => { console.log(err); }
     )
  }


  previousUserSlotNumber : any
  userId : any
  // Update Slot
  OpenUpdateModal(userId:any){
    let userSlot = this.bookedslotlist.find((slot:any) => slot.id === userId);
    this.previousUserSlotNumber = userSlot.slotNumber;
    this.userId = userSlot.id;
    this.currentUpdatedUserEmail = userSlot.email;
    this.updateSlotForm.patchValue({
      name : userSlot.name,
      vehicleNumber : userSlot.vehicleNumber,
      slotNumber : userSlot.slotNumber,
      entryTime : userSlot.entryTime,
      exitTime : userSlot.exitTime,
    });

    $('#updateSlot').modal('show');
  }



  onUpdateFormSubmit(){
    if(this.previousUserSlotNumber == this.updateSlotForm.get('slotNumber')?.value){
      this.UpdateUserSlotFunc();
    }
    else{
      this.slotService.CheckSlot(this.updateSlotForm.get('slotNumber')?.value).subscribe(
        (res) => {
          if(res){
            this.UpdateUserSlotFunc();
            this.showSlotMessage = false;
          }else{
            this.showSlotMessage = true;
          }
        },
        (err) => console.log(err)
        
      )
    }
  }

  UpdateUserSlotFunc(){
    this.bookedservice.UpdateUserBookedSlot(this.userId, this.updateSlotForm.value,this.currentUpdatedUserEmail, this.previousUserSlotNumber).subscribe(
      (res) => {
        if(res) {
          localStorage.setItem('name', this.updateSlotForm.get("name")?.value)
          localStorage.setItem('exitTime', this.updateSlotForm.get("exitTime")?.value)
          alert('Your Slot updated Successfully!')
          window.location.reload();
        }
        else{
          alert('Something went wrong!');
        }
      },
      (err) => { console.log(err); }
    )
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

  calculateDateDuration(startDate:any, endDate:any){
    var timeDifference = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000);
    timeDifference /= 60;
    return (Math.round(timeDifference));
  }

}


