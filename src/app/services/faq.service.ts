import { Injectable } from '@angular/core';
//firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// Observables library
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//interfaz pregunta
import { IdPregunta, pregunta } from '../models/faq.interface';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private preguntaCollection: AngularFirestoreCollection<pregunta>
  preguntas:Observable<IdPregunta[]>

  constructor(private fst:AngularFirestore) {
    this.preguntaCollection = this.fst.collection<IdPregunta>('pregunta')
    this.preguntas = this.preguntaCollection.snapshotChanges().pipe(
      map(a => a.map(a => {
        //mapeado de pregunta
        const pregunta: IdPregunta = {
          id: a.payload.doc.id,
          title: a.payload.doc.data().title,
          description: a.payload.doc.data().description
        }
        return pregunta
      }))
    )
  }

    //crea pregunta
    createPregunta(data:pregunta){
      return this.preguntaCollection.add(data)
    }
  
    //obtiene colección de preguntas
    getPreguntas(){
      return this.preguntas
    }
  
    //obtiene pregunta por id
    getPregunta(id:string){
      return this.preguntaCollection.doc(id).snapshotChanges().pipe(
        map(a => {
          const id= a.payload.id;
          const data= a.payload.data() as pregunta;
          return { id,...data }
        }
        )
      )
    }
    
    //actualiza pregunta por id
    updatePregunta(id:string, data:pregunta){
      return this.preguntaCollection.doc(id).update(data)
    }
    //borra pregunta por id
    deletePregunta(id:string){
      return this.preguntaCollection.doc(id).delete()
    }

}

