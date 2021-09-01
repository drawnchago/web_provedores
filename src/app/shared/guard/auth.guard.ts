import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot) {
      if(AuthService.isLoggedIn){
        if(route.data['id'] === 0){
          return true;
        }
        if(AuthService.checkPermissions(route.data['id'])){
          return true;
        } else{
          //this.router.navigate(['/dashboard']);
          return false;
        }
      }else{
        if(route.data['id'] === -1){
          return true;
        }
      }
  
      //this.router.navigate(['/authentication/login']);
      return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (AuthService.isAdmin() || AuthService.isSuperAdmin()) {
        return true;
      }
      console.log(childRoute);

      this.router.navigate(['/dashboard']);
      return false;
  }
  
}
