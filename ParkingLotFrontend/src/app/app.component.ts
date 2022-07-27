import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  name:any
  usename=false
  title = 'ParkingLot';
  constructor(private router:Router){}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    if(this.name == null){
       this.usename=false
    }
    else{
      this.usename=true
    }
  }

  onlogout(){
    alert('Logout Successfully!');
          this.usename=false
          localStorage.clear();
  }

}
