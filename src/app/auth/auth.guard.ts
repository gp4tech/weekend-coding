import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AuthUser } from '../shared/models/auth-user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      first(),
      map(user => {
        // if (state.url === '/login') {
        //   return this.checkLogIn(user !== null, '/');
        // }
        // return this.checkLogIn(user === null, '/login');
        if (user) {
          return this.checkAccess(user, state.url);
        }

        this.router.navigate(['/login']);
        return false;
      })
    );
  }

  private checkAccess(user: AuthUser, stateUrl: string) {
    let hasAccess = true;

    switch (stateUrl) {
      case '/postulants':
        hasAccess = user.roles.admin;
        break;
    }

    return hasAccess;
  }

  private checkLogIn(accessDenied: boolean, url: string): boolean {
    if (accessDenied) {
      this.router.navigate([url]);
      return false;
    }
    return true;
  }
}
