import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '@app/models/user-model';
import { InputsModel } from '@app/models/inputs-model';
import { UserService } from '@app/services/user.service';
import { MapsService } from '@app/services/maps.service';
import {} from 'googlemaps';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { AgmMap, AgmMarker, MarkerManager } from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';

interface marker{
  lati:number;
  lngi:number;
  label?:string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userModel: UserModel = {};
  inputsModel: InputsModel = {};
  
  initiallat:number;
  initiallon:number;
  lat: number;
  lon: number;
  lat2: number;
  long2: number;
  location: Object;
  agmMap: AgmMap;
  

  
  AgmMarkers: marker[] = [
    {
      lati:0,
      lngi:0
    }
  ]
    

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


   this.AgmMarkers = [];
   

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.initiallat = position.coords.latitude;
        this.initiallon = position.coords.longitude;
      })
    }

    this.userService.getCurrentUser().subscribe(
      documentSnapshot => {
        this.userModel = documentSnapshot.payload.data();
      }
    )
      

   
      
  }

  
  
  addFirstMarker(){//for 1st marker
    var longitude;
    var latitude;
    var geocoder = new google.maps.Geocoder();
    //var address = "UP Cebu, Cebu City, Cebu, Philippines";
    var address = (<HTMLInputElement>document.getElementById("test")).value;
            geocoder.geocode({ 'address': address }, (results, status)=> {
                if ((status === google.maps.GeocoderStatus.OK)) {
                    //this.lat = results[0].geometry.location.lat();
                    //this.lon = results[0].geometry.location.lng();
                    this.pushFirstMarker(results[0]);
                  } else {
                    alert("gg");
                }
            });
            //alert("Latitude: " + this.lat + "\nLongitude: " + this.lon);
            //alert("Latitude: " + latitude + "\nLongitude: " + longitude);   

  }

  pushFirstMarker(place){//for 1st marker
    this.lat = place.geometry.location.lat();
    this.lon = place.geometry.location.lng();
    this.initiallat = this.lat;
    this.initiallon = this.lon;
    this.AgmMarkers.push({
      lati:Number(this.lat),
      lngi:Number(this.lon),
      label: "source"
    });  
  }

  
  addSecondMarker(){//trial for 2nd marker
    var geocoder = new google.maps.Geocoder();
    //var address = "UP Cebu, Cebu City, Cebu, Philippines";
    var address = (<HTMLInputElement>document.getElementById("test2")).value;
            geocoder.geocode({ 'address': address }, (results, status)=> {
                if ((status === google.maps.GeocoderStatus.OK)) {
                    this.lat2 = results[0].geometry.location.lat();
                    this.long2 = results[0].geometry.location.lng();
                    this.AgmMarkers.push({
                      lati: this.lat2,
                      lngi: this.long2,
                      label: "destination"
                    });
                    this.initiallat = (this.initiallat + this.lat2)/2;
                    this.initiallon = (this.initiallon + this.long2)/2;
                  } else {
                    alert("gg");
                }
            });
            //alert("Latitude: " + this.lat + "\nLongitude: " + this.lon);
            //alert("Latitude: " + latitude + "\nLongitude: " + longitude);   
  }

  calcRoute(){
    
  }


  signOut(){
    this.loginService.logoutUser();
    this.toastr.success('Signed out successfully!')
  }

  onChoseLocation(event){
    /*this.AgmMarkers.push({
      lati: event.coords.lat,
      lngi: event.coords.lng
    });*/
    }

  openSideMenu(){
    document.getElementById('side-bar').style.width = '500px';
    document.getElementById('main').style.marginLeft = '500px';
  }

  closeSideMenu(){
    document.getElementById('side-bar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
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

// Details
public createListItem(type){
  var listItem = document.createElement("li");
  listItem.innerHTML = type
  return listItem;
}
public createListItemWithCost(type: any, cost: any){
  var listItem = document.createElement("li");
  listItem.innerHTML = type + cost + "   PHP";
  return listItem;
}


showJeepneyDetails(){
  var detailsList = document.getElementById("details-list");
  detailsList.innerHTML = "";
  var listItem = this.createListItemWithCost("Jeepney Route, ",7);
  detailsList.appendChild(listItem);
}

showTaxiDetails(){
  var detailsList = document.getElementById("details-list");
  detailsList.innerHTML = "";
  var listItem = this.createListItemWithCost("Taxi, ",40);
  detailsList.appendChild(listItem);
}

showMotorcycleDetails(){
  var detailsList = document.getElementById("details-list");
  detailsList.innerHTML = "";
  var listItem = this.createListItemWithCost("Motorcycle, ",30);
  detailsList.appendChild(listItem);
}

showTricycleDetails(){
  var detailsList = document.getElementById("details-list");
  detailsList.innerHTML = "";
  var listItem = this.createListItemWithCost("Tricycle, ",30);
  detailsList.appendChild(listItem);
}

showBusDetails(){
  var detailsList = document.getElementById("details-list");
  detailsList.innerHTML = "";
  var listItem = this.createListItemWithCost("Bus, ",50);
  detailsList.appendChild(listItem);
}

showTrainDetails(){
  var detailsList = document.getElementById("details-list");
  detailsList.innerHTML = "";
  var listItem = this.createListItemWithCost("Train, ",30);
  detailsList.appendChild(listItem);
}


}
