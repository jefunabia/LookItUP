import { Injectable } from '@angular/core';
import { UserModel } from './user-model.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  formData : UserModel;
  constructor(private firestore:AngularFirestore) { }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }
}
