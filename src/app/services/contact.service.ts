import { Injectable } from '@angular/core';
//firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// Observables library
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { contactoID, IContacto } from '../models/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactoCollection: AngularFirestoreCollection<any>
  contactos: Observable<contactoID[]>

  constructor(private fst: AngularFirestore) {
    this.contactoCollection = this.fst.collection<contactoID[]>('contacto')
    this.contactos = this.contactoCollection.snapshotChanges().pipe(
      map(a => a.map(a => {
        //mapeado de producto
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as IContacto;
        return { id, ...data }
      }))
    )
  }
  getContactos() {
    return this.contactos
  }

  getContacto(id: string) {
    return this.contactoCollection.doc(id).snapshotChanges().pipe(
      map(a => {
        const id = a.payload.id;
        const data = a.payload.data() as IContacto;
        return { id, ...data }
      })
    )
  }

  updateContacto(id: string, data: IContacto) {
    return this.contactoCollection.doc(id).update(data)
  }
}

