import { Injectable } from '@angular/core';
import { UserModel } from '@app/models/user-model';
import { UserTokenModel } from '@app/models/user-token-model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserStatus } from '@app/enums/user-status.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private firestore: AngularFirestore,
    private router: Router) { }

  addUserToken(user:UserModel):Promise<void>{
    var userToken = {} as UserTokenModel;
    userToken.id = this.firestore.createId();
    userToken.status = UserStatus.Offline;
    userToken.userId = user.id;
    this.addUserTokenToLocalStorage(userToken);
    return this.firestore.collection("userTokens").doc(userToken.id.toString()).set(userToken);
  }

  removeCurrentUserToken(){
    localStorage.removeItem("userToken");
  }

  addUserTokenToLocalStorage(userToken:UserTokenModel){
    localStorage.setItem("userToken", JSON.stringify(userToken));
  }
  
  getCurrentUserToken():UserTokenModel{
    return JSON.parse(localStorage.getItem("userToken")) as UserTokenModel;
  }
  
  checkUserTokenValidity(userToken:UserTokenModel):Promise<boolean>{
    if(userToken == null || userToken == undefined){
      this.router.navigate(['']);
      return Promise.resolve<boolean>(false);
    } else {
      return new Promise ( (resolve) => {
        this.firestore.collection("userTokens").doc(userToken.id.toString()).get().toPromise().then(
          documentSnapshot => {
            if(documentSnapshot.exists){
              resolve(true);
            } else {
              this.router.navigate(['']);
              resolve(false);
            }
          }
        )
      });
    }
  }

}
