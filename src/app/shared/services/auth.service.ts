import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public static checkPermissions(moduleId: number): boolean {
    let permission = false;
    
    Object.keys(this.getUser().rolePermissions).forEach(key => {
        if (AuthService.getUser().rolePermissions[key].module_id === moduleId) {
              permission = true;
        }
      });

      return permission;
    }

    static get isLoggedIn(): boolean {
      const user = JSON.parse(sessionStorage.getItem('user'));
      return (user !== null) ? true : false;
    }

    public static getUser(): any {
      return JSON.parse(sessionStorage.getItem('user'));
    }

    public static isAdmin(): boolean {
      return parseInt(sessionStorage.getItem('roleId')) === 1;
    }

    public static isSuperAdmin(): boolean {
      return parseInt(sessionStorage.getItem('roleId')) === 0;
    } 

    public static loggedOut() {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('user');
      //sessionStorage.removeItem('chats');
      //sessionStorage.removeItem('themeSettings');
      //sessionStorage.removeItem('lastLogin');
    }
}
