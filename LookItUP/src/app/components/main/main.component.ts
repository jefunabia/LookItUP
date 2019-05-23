import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '@app/models/user-model';
import { UserService } from '@app/services/user.service';
import { MapsService } from '@app/services/maps.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userModel: UserModel = {};
  lat: number;
  lon: number;

  location: Object;

  constructor(private toastr : ToastrService,
    private loginService: LoginService,
    private userService: UserService,
    private map: MapsService) {}

  ngOnInit() {
    this.map.getLocation().subscribe(
      data => {
      console.log(data);
   }
  )

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
      })
    }

    this.userService.getCurrentUser().subscribe(
      documentSnapshot => {
        this.userModel = documentSnapshot.payload.data();
      }
    )

      
  }

  signOut(){
    this.loginService.logoutUser();
    this.toastr.success('Signed out successfully!')
  }

  onChoseLocation(event){
    this.lat = event.coords.lat;
    this.lon = event.coords.lng;
  }

  openSideMenu(){
    document.getElementById('side-bar').style.width = '500px';
    document.getElementById('main').style.marginLeft = '500px';
  }
  
  closeSideMenu(){
    document.getElementById('side-bar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
}
