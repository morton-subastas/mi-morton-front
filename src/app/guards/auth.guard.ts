import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (private auth: AuthService, private router:Router ){

  }
  //ITS A SERVICE
  canActivate():  boolean  {
    if (this.auth.its_authenticate()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false; 
    }
  }
  
}
