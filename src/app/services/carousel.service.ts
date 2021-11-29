import { Injectable } from '@angular/core';
//firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// Observables library
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//interfaz picture
import { IdPicture, Ipicture } from '../models/carousel.interface';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  //colleción de carousel
  private pictureCollection: AngularFirestoreCollection<Ipicture>
  pictures: Observable<IdPicture[]>

  //referencia
  refPic: AngularFireStorageReference

  constructor(private fst: AngularFirestore, private fss: AngularFireStorage) {
    //referencia a carpeta de fotos en firebase
    this.refPic = this.fss.ref('carouselImg')

    this.pictureCollection = this.fst.collection<IdPicture>('picture')
    this.pictures = this.pictureCollection.snapshotChanges().pipe(
      map(a => a.map(a => {
        //mapeado de pregunta
        const picture: IdPicture = {
          id: a.payload.doc.id,
          img: a.payload.doc.data().img,
        }
        return picture
      }))
    )
  }

  //obtener objeto de carousel por id
  getPicture(id: string) {
    return this.pictureCollection.doc(id).snapshotChanges().pipe(
      map(a => {
        const id = a.payload.id;
        const data = a.payload.data() as Ipicture;
      })
    )
  }

  //obtener fotos
  getPictures() {
    return this.pictures
  }

  //actualizar objeto de carousel por id
  updatePicture(id: string, data: Ipicture) {
    return this.pictureCollection.doc(id).update(data)
  }

  //STORAGE 
  //subir archivo
  uploadImg(name:string, data:any){
    return this.fss.upload(`carouselImg/${name}`, data);
  }

  //referencia
  returnRef(name:string){
    return this.refPic.child(name)
  }
}