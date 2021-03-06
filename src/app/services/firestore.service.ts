import { Injectable } from '@angular/core';

//firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// Observables library
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

//interfaz producto
import { producto, IdProducto } from '../models/product.interface';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  //colección de productos
  private productCollection: AngularFirestoreCollection<any>
  productos: Observable<IdProducto[]>
  
  //referencia 
  refProd: AngularFireStorageReference

  constructor(private fst: AngularFirestore, private fss: AngularFireStorage) {
    //referencia a carpeta de imágenes en firebase
    this.refProd = this.fss.ref('productosImg')

    this.productCollection = this.fst.collection<IdProducto>('product')
    this.productos = this.productCollection.snapshotChanges().pipe(
      map(a => a.map(a => {
        //mapeado de producto
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as producto;
        return { id, ...data }
      }))
    )
  }

  //crea producto
  createProducto(data: producto) {
    return this.productCollection.add(data)
  }

  //obtiene colección de productos
  getProductos() {
    return this.productos
  }

  //obtiene producto por id
  getProducto(id: string) {
    return this.productCollection.doc(id).snapshotChanges().pipe(
      map(a => {
        const id = a.payload.id;
        const data = a.payload.data() as producto;
        return { id, ...data }
      })
    )
  }

  //obtener productos para carousel
  getProductoCarousel(){
    return this.fst.collection('product', ref => ref.where('fav', '==', true)).snapshotChanges().pipe(
      map(a => a.map(a=>{
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as producto;
        return {id, ...data}
      }))
    )
  }

  //actualiza producto por id
  updateProducto(id: string, data: producto) {
    return this.productCollection.doc(id).update(data)
  }
  //borra producto por id
  deleteProducto(id: string) {
    return this.productCollection.doc(id).delete()
  }


  //STORAGE 

  //subir archivo
  uploadImg(name: string, data: any) {
    return this.fss.upload(`productosImg/${name}`, data);
  }

  //obtener refernecia
  returnRef(name: string) {
    return this.refProd.child(name)
  }
}
