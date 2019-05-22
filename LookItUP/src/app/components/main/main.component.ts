import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '@app/models/user-model';
import { UserService } from '@app/services/user.service';
import { MapsService } from '@app/services/maps.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userModel: UserModel = {};
  lat: string = '';
  lon: string = '';

  location: Object;

  constructor(private toastr : ToastrService,
    private loginService: LoginService,
    private userService: UserService,
    private map: MapsService) {}

  ngOnInit() {
    this.map.getLocation().subscribe(
      data => {
      console.log(data);
      this.lat = data.latitude;
      this.lon = data.longitude;
    }
    )

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

}
