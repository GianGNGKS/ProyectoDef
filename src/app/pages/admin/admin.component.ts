import { Component, OnInit } from '@angular/core';

import { pregunta } from 'src/app/models/faq.interface';
import { FaqService } from 'src/app/services/faq.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  preguntas!:any[]
  selectedPregunta!:any

  formularioFAQ:FormGroup;

  constructor(private $db:FaqService, private fb:FormBuilder) {
    this.$db.getPreguntas().subscribe((resp => {
      this.preguntas = resp;
    }))

    this.formularioFAQ = this.fb.group({
      title:[''],
      description:['']
    })
  }

  ngOnInit(): void {
  }

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


    SeleccionarPregunta(pregunta: pregunta){
      this.selectedPregunta = pregunta;
    }

}
