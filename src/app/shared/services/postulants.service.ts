import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { DataService } from '../models/data-service.model';
import { Postulant } from '../models/postulant.model';
import { FirestoreCollection } from '../models/firestore-collection.enum';
import { DataOrder } from '../models/data-order.enum';
import { AuthUser } from '../models/auth-user.model';

@Injectable()
export class PostulantsService extends DataService<Postulant> {
  constructor(db: AngularFirestore) {
    super(db, FirestoreCollection.postulants);
  }

  getAcceptedPostulants(): Observable<Postulant[]> {
    return this.db
      .collection<Postulant>(this.collection, ref =>
        ref
          .where('deleteFlag', '==', false)
          .where('accepted', '==', true)
          .orderBy('fullName', DataOrder.asc)
      )
      .valueChanges();
  }

  getConfirmedPostulants(): Observable<Postulant[]> {
    return this.db
      .collection<Postulant>(this.collection, ref =>
        ref
          .where('deleteFlag', '==', false)
          .where('accepted', '==', true)
          .where('confirmedAssistant', '==', true)
          .orderBy('fullName', DataOrder.asc)
      )
      .valueChanges();
  }

  getLabPostulants(): Observable<Postulant[]> {
    return this.db
      .collection<Postulant>(this.collection, ref =>
        ref
          .where('deleteFlag', '==', false)
          .where('accepted', '==', true)
          .where('confirmedAssistant', '==', true)
          .where('checkIn', '==', true)
          // .where('lunchDelivered', '==', true)
      )
      .valueChanges();
  }

  acceptPostulant(user: AuthUser, postulant: Postulant): boolean {
    if (user.roles.admin) {
      postulant.accepted = !postulant.accepted;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markCredentialAsSent(user: AuthUser, postulant: Postulant): boolean {
    if (user.roles.admin && postulant.accepted) {
      postulant.credentialSent = !postulant.credentialSent;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  confirmPostulantAssistance(user: AuthUser, postulant: Postulant): boolean {
    if (user.roles.admin && postulant.accepted && postulant.credentialSent) {
      postulant.confirmedAssistant = !postulant.confirmedAssistant;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  checkInAssistant(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.accepted) {
      postulant.checkIn = !postulant.checkIn;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markFeeForLunchAsReceived(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.accepted && postulant.checkIn) {
      postulant.feeForLunchReceived = !postulant.feeForLunchReceived;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markLunchAsDelivered(user: AuthUser, postulant: Postulant): boolean {
    if (
      !user.roles.speaker &&
      postulant.accepted &&
      postulant.checkIn &&
      postulant.feeForLunchReceived
    ) {
      postulant.lunchDelivered = !postulant.lunchDelivered;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markFirstSnackAsDelivered(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.accepted && postulant.checkIn) {
      postulant.firstSnackDelivered = !postulant.firstSnackDelivered;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markSecondSnackAsDelivered(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.accepted && postulant.checkIn) {
      postulant.secondSnackDelivered = !postulant.secondSnackDelivered;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  givePointsToPostulant(
    user: AuthUser,
    postulant: Postulant,
    points: number
  ): boolean {
    if (!user.roles.staff && postulant.accepted && postulant.checkIn) {
      if (!postulant.teachersWhoGavePoints) {
        postulant.teachersWhoGavePoints = {};
      }
      postulant.teachersWhoGavePoints[user.id] = points;
      postulant.accumulatedPoints = 0;

      for (const teacherId in postulant.teachersWhoGavePoints) {
        if (postulant.teachersWhoGavePoints[teacherId]) {
          postulant.accumulatedPoints +=
            postulant.teachersWhoGavePoints[teacherId];
        }
      }

      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  giveRFIDToPostulant(
    user: AuthUser,
    postulant: Postulant,
    rfid: string
  ): boolean {
    if (!user.roles.speaker) {
      postulant.rfid = rfid;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }
}
