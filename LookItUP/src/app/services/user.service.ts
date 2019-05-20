import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore,
    private tokenService: TokenService) { }

  getCurrentUser(){
    var userToken = this.tokenService.getCurrentUserToken();
    if(userToken != null || userToken != undefined){
      return this.firestore.collection("users").doc(userToken.userId.toString()).snapshotChanges();
    }
  }

  getCurrentUserSnapshot(){
    var userToken = this.tokenService.getCurrentUserToken();
    if(userToken != null || userToken != undefined){
      return this.firestore.collection("users").doc(userToken.userId.toString()).get().toPromise();
    }
  }

}
