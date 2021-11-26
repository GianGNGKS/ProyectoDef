import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


//PREGUNTAS
import { pregunta, IdPregunta } from 'src/app/models/faq.interface';
import { FaqService } from 'src/app/services/faq.service';

//PRODUCTOS
import { IdProducto, producto } from 'src/app/models/product.interface';
import { FirestoreService } from 'src/app/services/firestore.service';


import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselService } from 'src/app/services/carousel.service';
import { IdPicture, Ipicture } from 'src/app/models/carousel.interface';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  //GLOBAL HTML   
  uploadState: boolean = false;

  //AUTH_STATE
  user!: any;

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
  imgurlproducto: string = '../../../assets/img/notavailable.png';

  //CAROUSEL
  pictures!: IdPicture[]
  idpicture!: string;
  indicePic!:number;
  imgurlpicture: string = '../../../assets/img/notavailable.png'

  constructor(private $db: FaqService, private fb: FormBuilder, private $dbp: FirestoreService, private auth: AuthService, private router: Router, private $dbpi: CarouselService,) {

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
      img: ['../../../assets/img/notavailable.png'],
      description: ['']
    })
    this.formularioProductoedit = this.fb.group({
      name: [''],
      price: [''],
      img: [''],
      description: ['']
    })

    this.$dbpi.getPictures().subscribe((resp => {
      this.pictures = resp;
    }))

    this.auth.sessionCheck().subscribe(resp => {
      this.user = resp
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


  //AGREGAR, EDITAR Y ELIMINAR PRODUCTOS
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

  async selectIMG(event: any) {
    this.uploadState = true
    const fileProd = event.target.files[0]
    let imgnamep = fileProd.name
    let edittedFileName = imgnamep.replace(" ", '-')
    console.log(edittedFileName)
    this.$dbp.returnRef(edittedFileName)
    await this.$dbp.uploadImg(edittedFileName, fileProd)
    await this.$dbp.returnRef(edittedFileName).getDownloadURL().toPromise().then((downloadUrl: any) => {
      this.imgurlproducto = downloadUrl;
    })
    this.uploadState = false;
  }

  selectPic(id: string, indice: number) {
    this.idpicture = id;
    this.indicePic = indice;
    console.log(this.idpicture);
  }

  async selectPicIMG(event:any){
    this.uploadState = true
    const filePic = event.target.files[0]
    let imgnamepic = filePic.name
    let edittedFileName = imgnamepic.replace(' ', '-')
    this.$dbpi.returnRef(edittedFileName)
    await this.$dbpi.uploadImg(edittedFileName, filePic)
    await this.$dbpi.returnRef(edittedFileName).getDownloadURL().toPromise().then((downloadUrl: any) => {
      this.imgurlpicture = downloadUrl
    })
    this.uploadState = false
    const picture: Ipicture = {
      img: this.imgurlpicture
    }
    this.$dbpi.updatePicture(this.idpicture, picture)
  }

  logOut() {
    this.auth.logout()
    this.router.navigate(['/home']);
  }

}
