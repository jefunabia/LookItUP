import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserModel } from '@app/models/user-model';
import { LoginService } from '@app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel: UserModel = {};

  constructor(private loginService: LoginService,
    private toastr : ToastrService, 
    private router: Router, 
    private titleService: Title) { }

  ngOnInit() {
    this.loginService.checkIfUserIsLoggedIn();
    this.titleService.setTitle('LookItUP | Login');
  }

  onSubmit(){
    this.loginService.loginUser(this.userModel);
  }

}
