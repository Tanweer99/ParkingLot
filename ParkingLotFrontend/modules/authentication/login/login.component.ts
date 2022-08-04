import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService, private route : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.route.navigate(['home'])
    }
  }

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
  });

  requestedFrom : any

  onFormSubmit(){
    this.authenticationService.Authentication(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
       (res) => {
            if(res.result.isAuth == true){
              if(res.result.isAdmin == true){
                localStorage.setItem('email', this.loginForm.get('email')?.value)
                localStorage.setItem('token', res.token);
                this.route.navigate(['dashboard'])
              }
              else{
                if(res.result.userSlot != null){
                      localStorage.setItem('token', res.token);
                      localStorage.setItem('id', res.result.userSlot.id);
                      localStorage.setItem('name', res.result.userSlot.name);
                      localStorage.setItem('vehicleNumber', res.result.userSlot.vehicleNumber);
                      localStorage.setItem('slotNumber', res.result.userSlot.slotNumber);
                      localStorage.setItem('entryTime', res.result.userSlot.entryTime);
                      localStorage.setItem('exitTime', res.result.userSlot.exitTime);
                      localStorage.setItem('email',res.result.userSlot.email);
                      this.route.navigate(['home']);
                  }
                  else{
                    localStorage.setItem('email', this.loginForm.get('email')?.value)
                    localStorage.setItem('token', res.token);
                    this.route.navigate(['home'])
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
  signup() {
    this.route.navigate(['signup']);
  }
}

