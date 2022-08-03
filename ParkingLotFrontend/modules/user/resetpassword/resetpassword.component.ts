import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/service/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private authentation:AuthenticationService, private route: Router) { }
 
   email:any;
   showoldpasswordmessage=false;
  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }
  resetPasswordForm = new FormGroup({
    oldpassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    newpassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
  });

  onFormSubmit(){
    this.authentation.OldPasswordMatch(this.resetPasswordForm.get('oldpassword')?.value, this.email).subscribe(
      (res) =>{
          if(res== true){
            this.showoldpasswordmessage= false;
            this.authentation.UpdateNewPassword(this.resetPasswordForm.value, this.email).subscribe(
              (result) => {
                if(result== true){
                  alert('Password changed successfully');
                  this.route.navigate(['home'])
                  // window.location.reload();
                }
                else{
                  alert('Something went wrong');
                }
              },
              (err) => console.log(err)
            )
          }
          else{
           this.showoldpasswordmessage= true;
          }
      },
      (err) => console.log(err)
    )
  }
}
