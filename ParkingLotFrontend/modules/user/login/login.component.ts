import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookSlotService } from 'src/service/book-slot.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private bookSlotService : BookSlotService, private currentRoute : ActivatedRoute, private route : Router) { }

  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    vehicleNumber : new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$"), Validators.maxLength(10)]),
  });

  requestedFrom : any

  onFormSubmit(){
    // console.log(this.loginForm.value);
    this.requestedFrom = this.currentRoute.snapshot.params['page'];

    // console.log(this.requestedFrom);
    
    this.bookSlotService.Authentication(this.loginForm.get('name')?.value, this.loginForm.get('vehicleNumber')?.value).subscribe(
      (res) => {
        // console.log(res.userSlot);
        if(res.userSlot != null){
          localStorage.setItem('id', res.userSlot.id);
          localStorage.setItem('name', res.userSlot.name);
          localStorage.setItem('vehicleNumber', res.userSlot.vehicleNumber);
          localStorage.setItem('slotNumber', res.userSlot.slotNumber);
          localStorage.setItem('entryTime', res.userSlot.entryTime);
          localStorage.setItem('exitTime', res.userSlot.exitTime);
          if(this.requestedFrom == 'update')
          {
            this.route.navigate(['updateSlot']);
          }
          else{
            this.route.navigate(['deleteSlot']);
          }
        }
        else{
          alert('Invalid Credentials!');
          window.location.reload();
        }
      },
      (err) => { console.log(err); }
    )
  }

}
