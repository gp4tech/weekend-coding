import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { first } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  getAuthState(): Observable<any> {
    return this.afAuth.authState.pipe(first());
  }

  login(email: string, password: string): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(_ => {
        this.router.navigate(['/postulants']);
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
