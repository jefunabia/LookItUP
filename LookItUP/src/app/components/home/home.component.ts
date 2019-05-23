import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
