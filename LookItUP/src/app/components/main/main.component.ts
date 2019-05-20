import { Component, OnInit } from '@angular/core';
import { LoginService } from '@app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '@app/models/user-model';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userModel: UserModel = {};

  constructor(private toastr : ToastrService,
    private loginService: LoginService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      documentSnapshot => {
        this.userModel = documentSnapshot.payload.data();
      }
    )
  }

  signOut(){
    this.loginService.logoutUser();
    this.toastr.success(Signed out successfully!')
  }

}
