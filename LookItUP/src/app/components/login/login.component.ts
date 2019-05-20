import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserModel } from '@app/models/user-model';
import { LoginService } from '@app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel: UserModel = {};

  constructor(private loginService: LoginService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.loginService.checkIfUserIsLoggedIn();
  }

  onSubmit(){
    this.loginService.loginUser(this.userModel);
  }

}
