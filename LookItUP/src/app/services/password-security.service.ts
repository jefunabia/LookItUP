import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordSecurityService {

  constructor() { }

  encrypt(plainText: String):String{
    return CryptoJS.MD5(plainText).toString();
  }

}
