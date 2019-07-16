import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { first } from 'rxjs/operators';
import * as firebase from 'firebase';

import { DataService } from '../shared/models/data-service.model';
import { AuthUser } from '../shared/models/auth-user.model';
import { FirestoreCollection } from '../shared/models/firestore-collection.enum';

@Injectable()
export class AuthUserService extends DataService<AuthUser> {
  private currentUser: AuthUser;

  constructor(db: AngularFirestore) {
    super(db, FirestoreCollection.users);
  }

  getCurrentUser(): AuthUser {
    return this.currentUser;
  }

  assertAuthUser(firebaseUser: firebase.User): void {
    this.getById(firebaseUser.uid)
      .pipe(first())
      .subscribe(user => {
        if (!user) {
          user = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            deleteFlag: false
          };
          this.upsertData(user);
        }

        this.currentUser = user;
      });
  }
}
