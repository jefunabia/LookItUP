import { Injectable } from '@angular/core';
import { UserModel } from '@models/user-model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { PasswordSecurityService } from '@services/password-security.service';
import { RegisterErrorCode } from '@enums/register-error-code.enum';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private firestore:AngularFirestore, 
    private passwordSecurityService: PasswordSecurityService) { }

  registerUser(user:UserModel):Promise<void>{
    return new Promise<void> ( 
      (resolve,reject) => { 
        this.verifyInputs(user).then(
          errorCode => {
            //If there are no errors, return a task to user to database
            if(errorCode == RegisterErrorCode.NoError){
              var id = this.firestore.createId();
              user.id = id;
              var hashedPassword = this.passwordSecurityService.encrypt(user.password);
              user.password = hashedPassword;
              user.confirmPassword = hashedPassword;
              resolve(this.firestore.collection("users").doc(id).set(user));
            } 
            else {
              //if there are errors, reject the request to put user in the database
              reject(errorCode);
            }
          }
        );
      }
    );
  }
  
  async verifyInputs(user:UserModel):Promise<RegisterErrorCode>{
    //Check if there are missing entries
    if(user.email == undefined || user.email == "" ||
        user.username == undefined || user.username == "" ||
        user.displayName == undefined || user.displayName == "" ||
        user.password == undefined || user.password == "" ||
        user.confirmPassword == undefined || user.confirmPassword == ""){
      return Promise.resolve(RegisterErrorCode.MissingEntries);
    }

    //Checks whether username length >= 6
    if(user.username.length < 6){
      return Promise.resolve(RegisterErrorCode.UsernameTooShort);
    }

     //Checks whether displayName length >= 4
     if(user.displayName.length < 4){
      return Promise.resolve(RegisterErrorCode.DisplayNameTooShort);
    }

    //Checks whether password length >= 6
    if(user.password.length < 6){
      return Promise.resolve(RegisterErrorCode.PasswordTooShort);
    }

    //Checks if password and confirm password matches
    if(user.password != user.confirmPassword){
      return Promise.resolve(RegisterErrorCode.PasswordsDontMatch);
    }

    //Starts an async task to check whether the username is already taken
    var usernameIsTaken = this.firestore.collection("users").ref.where("username", "==", user.username).get().then(
      querySnapshot => {
        if(!querySnapshot.empty){
          return Promise.resolve<RegisterErrorCode>(RegisterErrorCode.UsernameIsTaken);
        } else {
          return null;
        }
      }
    );

    //Starts an async task to check whether the email is already taken
    var emailIsTaken = this.firestore.collection("users").ref.where("email", "==", user.email).get().then(
      querySnapshot => {
        if(!querySnapshot.empty){
          return Promise.resolve<RegisterErrorCode>(RegisterErrorCode.EmailIsTaken);
        } else {
          return null;
        }
      }
    );

    //Waits for the task that was deployed a while ago
    if(await usernameIsTaken != null){
      return Promise.resolve(RegisterErrorCode.UsernameIsTaken);
    } 
    //Waits for the task that was deployed a while ago
    if( await emailIsTaken != null){
      return Promise.resolve(RegisterErrorCode.EmailIsTaken);
    }
    
    //If no errors are found, return no error
    return Promise.resolve<RegisterErrorCode>(RegisterErrorCode.NoError);
  }

}
