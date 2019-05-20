import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenService } from '../token.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private tokenService: TokenService) {}

   canActivate(): Promise<boolean> {
    var userToken = this.tokenService.getCurrentUserToken();
    return this.tokenService.checkUserTokenValidity(userToken);
  }

}