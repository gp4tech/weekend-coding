import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthUserService } from './auth-user.service';
import { AuthUser } from '../shared/models/auth-user.model';

@Injectable()
export class AuthService {
  loading = false;
  message: string;

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
    this.loading = true;

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.message = '';
        this.userService.assertAuthUser(credential.user);
        this.router.navigate(['/']);
        setTimeout(() => {
          this.loading = false;
        }, 500);
      })
      .catch(err => {
        this.message = err;
        this.loading = false;
      });
  }

  logout(): void {
    this.afAuth.auth
      .signOut()
      .then(_ => {
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
