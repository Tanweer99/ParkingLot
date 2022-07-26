import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private route:Router) { }
  
  ngOnInit(): void {
  }
  emailAvailable=true
  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z_ ]*$/), Validators.maxLength(255)]),
    bank: new FormControl(null, [Validators.required]),
    accountNumber: new FormControl(null, [Validators.required, Validators.maxLength(12), Validators.minLength(12)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
  });

  onFormSubmit(){
    this.authenticationService.UserSignUp(this.signupForm.value).subscribe(
      (res) => {
        if(res){
          this.emailAvailable=true
          alert('Register Successfully!')
          this.route.navigate(['signin'])
        }
        else{
          this.emailAvailable=false
        }
      },
      (err)=> console.log(err)
    )
  }
}

