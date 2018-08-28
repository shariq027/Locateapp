import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-layout',
  templateUrl: '../Templates/Views/header.component.html',
  styleUrls: ['../Templates/CSS/header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router){

  }
  gotoHome(){
    this.router.navigate(["/locations"]);
  }
}
