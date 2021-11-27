import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IdPicture, Ipicture } from 'src/app/models/carousel.interface';
import { IdPregunta, pregunta } from 'src/app/models/faq.interface';
import { IdProducto, producto } from 'src/app/models/product.interface';
import { CarouselService } from 'src/app/services/carousel.service';
import { FaqService } from 'src/app/services/faq.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  uploadState:boolean = false;

  //PREGUNTAS
  preguntas!: IdPregunta[] //ARREGLO PREGUNTAS
  formularioFAQ: FormGroup; //FORMULARIO PREGUNTAS
  formularioFAQedit: FormGroup; //FORMULARIO PREGUNTAS EDITAR
  idpregunta!: string

  productos!: IdProducto[] //ARREGLO PRODUCTOS
  formularioProducto!: FormGroup; //FORMULARIO PRODUCTOS
  formularioProductoedit!: FormGroup; //FORMULARIO PRODUCTOS EDITAR
  idproducto!: string;
  imgurlproducto: string = '../../../assets/img/notavailable.png';

  //CAROUSEL
  pictures!: IdPicture[]

  constructor(private $db: FaqService, private fb: FormBuilder, private $dbp: FirestoreService, private $dbpi: CarouselService) {
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

    this.$dbp.getProductos().subscribe((resp => {
      this.productos = resp
    }))

    this.$dbpi.getPictures().subscribe((resp => {
      this.pictures = resp;
    }))
  }

  ngOnInit(): void {
  }

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

  aceptarPRODUCTO() {
    const producto: producto = {
      name: this.formularioProducto.value.name,
      img: this.imgurlproducto,
      price: this.formularioProducto.value.price,
      description: this.formularioProducto.value.description
    }
    this.$dbp.createProducto(producto)
    this.formularioProducto.patchValue({
      name: '',
      img: '',
      price: '',
      description: '',
    })
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
      img: this.imgurlproducto,
      description: this.formularioProductoedit.value.description
    }
    this.$dbp.updateProducto(this.idproducto, producto)
  }

  async selectIMG(id: string, event: any){
    let imgpicture!: any;
    this.uploadState = true;
    const filePic = event.target.files[0];
    console.log(filePic);
    let imgnamepic = filePic.name;
    let edittedFileName = imgnamepic.replace(' ', '-');
    console.log(edittedFileName);
    this.$dbpi.returnRef(edittedFileName);
    await this.$dbpi.uploadImg(edittedFileName, filePic);
    await this.$dbpi.returnRef(edittedFileName).getDownloadURL().toPromise().then((downloadURL) =>{
      imgpicture = downloadURL
      console.log(downloadURL)
    })
    console.log(imgpicture)
    const pictures:Ipicture = {
      img: imgpicture
    }
    this.$dbpi.updatePicture(id, pictures);
    this.uploadState = false;
  }


}
