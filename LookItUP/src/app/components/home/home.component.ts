import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('LookItUP | Home');
  }

  formattedAddress = '';
  options = {
    componentRestrictions : {
      country: ['PH']
    }
  }
  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
}


}
