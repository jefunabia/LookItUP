import { Injectable } from '@angular/core';
import { UserModel } from '@models/user-model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { UserTokenModel } from '@app/models/user-token-model';
import { UserStatus } from '@app/enums/user-status.enum';
import { PasswordSecurityService } from './password-security.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private firestore:AngularFirestore,
    private passwordSecurityPassword: PasswordSecurityService,
    private toastr : ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService) { }

  loginUser(user:UserModel){
    if(this.verifyCredentials(user)){
      var query = this.firestore.collection("users").ref.where("username", "==", user.username).get().then(
        querySnapshot => {
          if(!querySnapshot.empty){
            var retrievedUser = querySnapshot.docs[0].data();
            retrievedUser.id = querySnapshot.docs[0].id;
            if(this.passwordSecurityPassword.encrypt(user.password) == retrievedUser.password){
              this.tokenService.addUserToken(retrievedUser).then(
                result => {
                  this.checkIfUserIsLoggedIn();
                }
              );
            }
            else{
              this.toastr.error("Incorrect Password","Authentication Failed");
            }
          } else {
            this.toastr.error("User not found","Authentication Failed");
          }
        }
      );
    }
  }

  verifyCredentials(user:UserModel):Boolean{
    if (user.username == "" || user.username == undefined){
      this.toastr.error("Username is missing","Input missing credentials");
      return false;
    } 
    else if (user.password == "" || user.password == undefined){
      this.toastr.error("Password is missing","Input missing credentials");
      return false;
    }
    return true;
  }

  checkIfUserIsLoggedIn(){
    var userToken = this.tokenService.getCurrentUserToken();
    if(userToken != null || userToken != undefined){
      this.firestore.collection("userTokens").doc(userToken.id.toString()).get().subscribe(
        documentSnapshot => {
          if(documentSnapshot.exists){
            this.loginCurrentUser(userToken);
          }
        }
      )
    }
  }

  loginCurrentUser(userToken:UserTokenModel){
    this.firestore.collection("userTokens").doc(userToken.id.toString()).update({"status": UserStatus.Active});
    userToken.status = UserStatus.Active;
    localStorage.setItem("userToken", JSON.stringify(userToken));
    this.userService.getCurrentUserSnapshot().then(
      documentSnapshot => {
        var userModel = documentSnapshot.data() as UserModel;
        this.toastr.success("Welcome back, " + userModel.displayName, "Authentication Success");
        this.router.navigate(['./home']);
      }
    )
    
  }

  logoutUser(){
    var userToken = this.tokenService.getCurrentUserToken();
    this.firestore.collection("userTokens").doc(userToken.id.toString()).delete();
    this.tokenService.removeCurrentUserToken();
    this.router.navigate(['./login']);
  }

  

}
