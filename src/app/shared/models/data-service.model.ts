import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { DataType } from './data-type.model';
import { DataOrder } from './data-order.enum';
import { FirestoreCollection } from './firestore-collection.enum';

export abstract class DataService<T extends DataType> {
  dataCollection: AngularFirestoreCollection<T>;

  constructor(
    protected db: AngularFirestore,
    protected collection: FirestoreCollection
  ) {
    this.dataCollection = db.collection<T>(collection);
  }

  getAll(): Observable<T[]> {
    return this.dataCollection.valueChanges();
  }

  getAllSorted(
    field: string,
    order: DataOrder,
    maxLimit?: number
  ): Observable<T[]> {
    return this.db
      .collection<T>(this.collection, ref => {
        let query = ref.orderBy(field, order);
        if (maxLimit) {
          query = query.limit(maxLimit);
        }
        return query;
      })
      .valueChanges();
  }

  getById(id: string): Observable<T> {
    return this.db.doc<T>(`${this.collection}/${id}`).valueChanges();
  }
}
