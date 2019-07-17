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
        if (state.url === '/login') {
          return this.checkLogIn(user !== null, '/');
        }
        return this.checkLogIn(user === null, '/login');
      })
    );
  }

  private checkLogIn(accessDenied: boolean, url: string): boolean {
    if (accessDenied) {
      this.router.navigate([url]);
      return false;
    }
    return true;
  }
}
