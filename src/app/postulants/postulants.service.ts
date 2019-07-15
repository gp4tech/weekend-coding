import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { DataService } from '../shared/models/data-service.model';
import { Postulant } from '../shared/models/postulant.model';
import { FirestoreCollection } from '../shared/models/firestore-collection.enum';

@Injectable()
export class PostulantsService extends DataService<Postulant> {
  constructor(db: AngularFirestore) {
    super(db, FirestoreCollection.postulants);
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
