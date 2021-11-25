import { Component, OnInit } from '@angular/core';

//PREGUNTAS
import { pregunta, IdPregunta } from 'src/app/models/faq.interface';
import { FaqService } from 'src/app/services/faq.service';

//PRODUCTOS
import { IdProducto, producto } from 'src/app/models/product.interface';
import { FirestoreService } from 'src/app/services/firestore.service';


import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  //PREGUNTAS
  preguntas!: IdPregunta[] //ARREGLO PREGUNTAS
  formularioFAQ: FormGroup; //FORMULARIO PREGUNTAS
  formularioFAQedit: FormGroup; //FORMULARIO PREGUNTAS EDITAR
  idpregunta!: string

  //PRODUCTOS
  productos!: IdProducto[] //ARREGLO PRODUCTOS
  formularioProducto!: FormGroup; //FORMULARIO PRODUCTOS
  formularioProductoedit!: FormGroup; //FORMULARIO PRODUCTOS EDITAR
  idproducto!: string;

  constructor(private $db: FaqService, private fb: FormBuilder, private $dbp: FirestoreService) {

    //PREGUNTAS
    this.$db.getPreguntas().subscribe((resp => {
      this.preguntas = resp;
    }))
    this.formularioFAQ = this.fb.group({
      title: [''],
      description: ['']
    })
    this.formularioFAQedit = this.fb.group({
      title: [''],
      description: ['']
    })

    //PRODUCTOS
    this.$dbp.getProductos().subscribe((resp => {
      this.productos = resp
    }))
    this.formularioProducto = this.fb.group({
      name: [''],
      price: [''],
      img: [''],
      description: ['']
    })
    this.formularioProductoedit = this.fb.group({
      name: [''],
      price: [''],
      img: [''],
      description: ['']
    })

  }

  ngOnInit(): void {
  }
  //AGREGAR, EDITAR Y ELIMINAR PREGUNTAS
  deleteFAQ(id: string) {
    this.$db.deletePregunta(id);
  }
  aceptarFAQ() {
    const pregunta: pregunta = {
      title: this.formularioFAQ.value.title,
      description: this.formularioFAQ.value.description
    }
    this.$db.createPregunta(pregunta);
  }
  selectPregunta(id: string) {
    this.idpregunta = id;
    this.$db.getPregunta(id).subscribe(pregunta => {
      this.formularioFAQedit.patchValue({
        title: pregunta.title,
        description: pregunta.description
      })
    })
    console.log(this.idpregunta);
  }
  updateFAQ() {
    const pregunta: pregunta = {
      title: this.formularioFAQedit.value.title,
      description: this.formularioFAQedit.value.description
    }
    this.$db.updatePregunta(this.idpregunta, pregunta);
  }


  //AGREGAR, EDITAR Y ELIMINAR PRODUCTOS}
  aceptarPRODUCTO() {
    const producto: producto = {
      name: this.formularioProducto.value.name,
      img: this.formularioProducto.value.img,
      price: this.formularioProducto.value.price,
      description: this.formularioProducto.value.description
    }
    this.$dbp.createProducto(producto)
  }

  deletePRODUCTO(id: string) {
    this.$dbp.deleteProducto(id);
  }

  selectProducto(id: string) {
    this.idproducto = id;
    this.$dbp.getProducto(id).subscribe(producto => {
      this.formularioProductoedit.patchValue({
        name: producto.name,
        img: producto.img,
        price: producto.price,
        description: producto.description
      })
    })
    console.log(this.idproducto)
  }

  updatePRODUCTO() {
    const producto: producto = {
      name: this.formularioProductoedit.value.name,
      price: this.formularioProductoedit.value.price,
      img: this.formularioProductoedit.value.img,
      description: this.formularioProductoedit.value.description
    }
    this.$dbp.updateProducto(this.idproducto, producto)
  }

}
