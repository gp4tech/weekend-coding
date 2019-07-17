import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthUserService } from './auth-user.service';
import { AuthUser } from '../shared/models/auth-user.model';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: AuthUserService
  ) {}

  getCurrentUser(): Observable<AuthUser> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getById(user.uid);
        }

        return of(null);
      })
    );
  }

  login(email: string, password: string): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.userService.assertAuthUser(credential.user);
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  logout(): void {
    this.afAuth.auth
      .signOut()
      .then(_ => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  private handleError(err: string): void {
    console.error(err);
  }
}
