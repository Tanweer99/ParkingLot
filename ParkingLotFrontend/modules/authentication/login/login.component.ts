import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService, private route : Router) { }

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
  });

  requestedFrom : any

  onFormSubmit(){
    this.authenticationService.Authentication(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
       (res) => {
           if(res.isAuth == true){
              if(res.isAdmin == true){
                 this.route.navigate([''])
              }
              else{
                if(res.userSlot != null){
                      localStorage.setItem('id', res.userSlot.id);
                       localStorage.setItem('name', res.userSlot.name);
                       localStorage.setItem('vehicleNumber', res.userSlot.vehicleNumber);
                       localStorage.setItem('slotNumber', res.userSlot.slotNumber);
                       localStorage.setItem('entryTime', res.userSlot.entryTime);
                       localStorage.setItem('exitTime', res.userSlot.exitTime);
                       localStorage.setItem('email',res.userSlot.email);
                       this.route.navigate(['']);
                    } 
              }
           }
           else{
            alert('Invalid Credentials!');
            window.location.reload();
           }
       },
       (err) => {console.log(err)}
    )
  }
}

