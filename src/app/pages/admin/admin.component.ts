import { Component, OnInit } from '@angular/core';

import { pregunta, IdPregunta } from 'src/app/models/faq.interface';
import { FaqService } from 'src/app/services/faq.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  //PREGUNTAS
  preguntas!:any[] //ARREGLO PREGUNTAS
  formularioFAQ:FormGroup; //FORMULARIO PREGUNTAS
  formularioFAQedit:FormGroup; //FORMULARIO PREGUNTAS EDITAR

  idpregunta!:string

  constructor(private $db:FaqService, private fb:FormBuilder) {
    
    //PREGUNTAS
    this.$db.getPreguntas().subscribe((resp => {
      this.preguntas = resp;
    }))
    this.formularioFAQ = this.fb.group({
      title:[''],
      description:['']
    })

    this.formularioFAQedit = this.fb.group({
      title:[''],
      description:['']
    })

    //PRODUCTOS
  }

  ngOnInit(): void {
  }
    //AGREGAR, EDITAR Y ELIMINAR PREGUNTAS
    deleteFAQ(id:string){
      this.$db.deletePregunta(id);
    }
    aceptarFAQ(){
      const pregunta:pregunta = {
        title: this.formularioFAQ.value.title,
        description: this.formularioFAQ.value.description
      }
      this.$db.createPregunta(pregunta);
    }

    selectPregunta(id:string) {
      this.idpregunta= id;
      this.$db.getPregunta(id).subscribe(pregunta => {
        this.formularioFAQedit.patchValue({
          title: pregunta.title,
          description: pregunta.description
        })
      })
      console.log(this.idpregunta);
    }

    updateFAQ() {
      const pregunta:pregunta = {
        title: this.formularioFAQedit.value.title,
        description: this.formularioFAQedit.value.description
      }
      this.$db.updatePregunta(this.idpregunta, pregunta);
    }
}
