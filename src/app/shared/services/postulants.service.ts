import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { DataService } from '../models/data-service.model';
import { Postulant } from '../models/postulant.model';
import { FirestoreCollection } from '../models/firestore-collection.enum';
import { DataOrder } from '../models/data-order.enum';

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

  acceptPostulant(postulant: Postulant): void {
    postulant.accepted = !postulant.accepted;
    this.upsertData(postulant);
  }

  markCredentialAsSent(postulant: Postulant): void {
    if (postulant.accepted) {
      postulant.credentialSent = !postulant.credentialSent;
      this.upsertData(postulant);
    }
  }

  confirmPostulantAssistance(postulant: Postulant): void {
    if (postulant.accepted && postulant.credentialSent) {
      postulant.confirmedAssistant = !postulant.confirmedAssistant;
      this.upsertData(postulant);
    }
  }
}
