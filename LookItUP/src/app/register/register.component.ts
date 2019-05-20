import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { RegisterServiceService } from '../shared/register-service.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service : RegisterServiceService,
    private firestore:AngularFirestore,
    private toastr : ToastrService) { }

  ngOnInit() {
    $('.message a').click(function () {
      $('form').animate({ height: "toggle", opacity: "toggle" });
  });

  this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      id : null,
      email : '',
      username : '',
      displayName : '',
      password : '',
      confirmPassword : ''
    }
  }

  onSubmit(form:NgForm){
    let data = form.value;
    this.firestore.collection('registeredUsers').add(data);
    this.resetForm(form);
    this.toastr.success('Registration Success!');
  }
}
