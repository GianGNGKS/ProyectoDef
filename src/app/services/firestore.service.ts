import { Injectable } from '@angular/core';

//firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// Observables library
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

//interfaz producto
import { producto, IdProducto } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  
  //colección de productos
  private productCollection: AngularFirestoreCollection<any>
  productos:Observable<IdProducto[]> 

  constructor(private fst:AngularFirestore) { 
    this.productCollection = this.fst.collection<IdProducto>('product')
    this.productos = this.productCollection.snapshotChanges().pipe(
      map(a => a.map(a => {
        //mapeado de producto
        const producto: IdProducto = {
          id: a.payload.doc.id,
          name: a.payload.doc.data().name,
          price: a.payload.doc.data().price,
          img: a.payload.doc.data().img,
          size: a.payload.doc.data().size,
          description: a.payload.doc.data().description
        }
        return producto
      }))
    )
  }
  
  //crea producto
  createProducto(data:producto){
    return this.productCollection.add(data)
  }

  //obtiene colección de productos
  getProductos(){
    return this.productos
  }

  //obtiene producto por id
  getProducto(id:string){
    return this.productCollection.doc(id).snapshotChanges()
  }
  
  //actualiza producto por id
  updateProducto(id:string, data:producto){
    return this.productCollection.doc(id).update(data)
  }
  //borra producto por id
  deleteProducto(id:string){
    return this.productCollection.doc(id).delete()
  }
}
