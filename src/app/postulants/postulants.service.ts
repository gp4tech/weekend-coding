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
}
