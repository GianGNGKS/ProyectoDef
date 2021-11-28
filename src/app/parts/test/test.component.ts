import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdPicture, Ipicture } from 'src/app/models/carousel.interface';
import { contactoID, IContacto } from 'src/app/models/contacto.interface';
import { IdPregunta, pregunta } from 'src/app/models/faq.interface';
import { IdProducto, producto } from 'src/app/models/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CarouselService } from 'src/app/services/carousel.service';
import { ContactService } from 'src/app/services/contact.service';
import { FaqService } from 'src/app/services/faq.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  uploadState: boolean = false;

  //AUTH_STATE
  user!: any;

  //PREGUNTAS
  preguntas!: IdPregunta[] //ARREGLO PREGUNTAS
  formularioFAQ: FormGroup; //FORMULARIO PREGUNTAS
  formularioFAQedit: FormGroup; //FORMULARIO PREGUNTAS EDITAR
  idpregunta!: string

  productos!: IdProducto[] //ARREGLO PRODUCTOS
  formularioProducto!: FormGroup; //FORMULARIO PRODUCTOS
  formularioProductoedit!: FormGroup; //FORMULARIO PRODUCTOS EDITAR
  idproducto!: string;
  selectedProductImg!: string;
  imgurlproducto: string = '../../../assets/img/notavailable.png';
  img64!: any;

  contactos!: contactoID[]
  formularioContact!: FormGroup; //FORMULARIO
  idcontacto!: string;

  //CAROUSEL
  pictures!: IdPicture[]

  constructor(private $db: FaqService,
    private fb: FormBuilder,
    private $dbp: FirestoreService,
    private $dbpi: CarouselService,
    private auth: AuthService,
    private router: Router,
    private $dbc: ContactService,
    private toast: ToastrService) {
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

    this.$dbc.getContactos().subscribe((resp => {
      this.contactos = resp
    }))

    this.formularioContact = this.fb.group({
      negocioName: [''],
      pnumber: [''],
      address: [''],
      facebook: [''],
      instagram: [''],
      mercadoLibre: [''],
    })

  }

  ngOnInit(): void {
    this.idcontacto = 'vN3lxR4ls8vtqq2YOTX5'
    console.log(this.idcontacto)
    this.$dbc.getContacto(this.idcontacto).subscribe(contacto =>{
      this.formularioContact.patchValue({
        negocioName: contacto.negocioName,
        pnumber: contacto.pnumber,
        address: contacto.address,
        instagram: contacto.instagram,
        facebook: contacto.facebook,
        mercadoLibre: contacto.mercadoLibre
      })
    })
    this.toast.info("Bievenido a la sección de administración",'Ingreso como administrador', {positionClass: 'toast-top-left', closeButton: true})

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
    this.toast.info("Se ha edtiar exitosamente la pregunta.", "Pregunta editada", {positionClass: 'toast-bottom-right', closeButton: true})
  }

  aceptarPRODUCTO() {
    const producto: producto = {
      name: this.formularioProducto.value.name,
      img: this.imgurlproducto,
      price: this.formularioProducto.value.price,
      description: this.formularioProducto.value.description,
      fav: false
    }
    this.$dbp.createProducto(producto)
    this.formularioProducto.patchValue({
      name: '',
      img: '',
      price: '',
      description: '',
    })
    this.toast.success("Se ha agregado el producto exitosamente.", "Producto agregado", {positionClass: 'toast-bottom-right', closeButton: true})
  }

  deletePRODUCTO(id: string) {
    this.$dbp.deleteProducto(id);
    this.toast.warning("Se ha eliminado el producto exitosamente.", "Producto eliminado", {positionClass: 'toast-bottom-right', closeButton: true})
  }

  selectProducto(id: string) {
    this.idproducto = id;
    this.$dbp.getProducto(id).subscribe(producto => {
      this.formularioProductoedit.patchValue({
        name: producto.name,
        price: producto.price,
        description: producto.description
      })
      if (producto.img) {
        this.img64 = producto.img
        this.selectedProductImg = producto.img;
      }
    })
  }

  updatePRODUCTO() {
    if(this.imgurlproducto){
      const producto: producto = {
      name: this.formularioProductoedit.value.name,
      price: this.formularioProductoedit.value.price,
      img: this.imgurlproducto,
      description: this.formularioProductoedit.value.description
    }
    this.$dbp.updateProducto(this.idproducto, producto)
    
    }else {
      const producto: producto = {
      name: this.formularioProductoedit.value.name,
      price: this.formularioProductoedit.value.price,
      img: this.selectedProductImg,
      description: this.formularioProductoedit.value.description
    }
    this.$dbp.updateProducto(this.idproducto, producto)
    }
    this.imgurlproducto = '';
    this.selectedProductImg = '';
    this.formularioProductoedit.patchValue({
      name:'',
      price:'',
      img:'',
      description:'',
    })
    this.toast.info("Se ha actualizado el producto exitosamente.", "Producto actualizado", {positionClass: 'toast-bottom-right', closeButton: true})

  }

  favProduct(id: string, fav: boolean) {
    if (fav) {
      const producto: producto = {
        fav: false
      }
      this.$dbp.updateProducto(id, producto)
    } else {
      const producto: producto = {
        fav: true
      }
      this.$dbp.updateProducto(id, producto)
    }
    this.toast.info("Se ha agregado el producto exitosamente a la sección Destacados.", "Producto destacado", {positionClass: 'toast-bottom-right', closeButton: true})
  }


  async selectIMG(id: string, event: any) {
    let imgpicture!: any;
    this.uploadState = true;
    const filePic = event.target.files[0];
    console.log(filePic);
    let imgnamepic = filePic.name;
    let edittedFileName = imgnamepic.replace(' ', '-');
    console.log(edittedFileName);
    this.$dbpi.returnRef(edittedFileName);
    await this.$dbpi.uploadImg(edittedFileName, filePic);
    await this.$dbpi.returnRef(edittedFileName).getDownloadURL().toPromise().then((downloadURL) => {
      imgpicture = downloadURL
      console.log(downloadURL)
    })
    console.log(imgpicture)
    const pictures: Ipicture = {
      img: imgpicture
    }
    this.$dbpi.updatePicture(id, pictures);
    this.uploadState = false;
    this.toast.info("Se ha modificado exitosamente la imagen.", "Imagen modificada", {positionClass: 'toast-bottom-right', closeButton: true})

  }

  async selectIMGP(event: any) {
    this.uploadState = true
    const fileProd = event.target.files[0]
    let imgnamep = fileProd.name

    const reader = new FileReader();
    reader.readAsDataURL(fileProd);
    reader.onload = () => {
      this.img64 = reader.result
    };

    let edittedFileName = imgnamep.replace(" ", '-')
    console.log(edittedFileName)
    this.$dbp.returnRef(edittedFileName)
    await this.$dbp.uploadImg(edittedFileName, fileProd)
    await this.$dbp.returnRef(edittedFileName).getDownloadURL().toPromise().then((downloadUrl: any) => {
      this.imgurlproducto = downloadUrl;
    })
    this.uploadState = false;
  }

  logOut() {
    this.auth.logout()
    this.router.navigate(['/home']);
  }


  updateContactoF(id: string) {
    this.idcontacto = id
    console.log(this.idcontacto)
    const contacto: IContacto = {
      negocioName: this.formularioContact.value.negocioName,
      address: this.formularioContact.value.address,
      pnumber: this.formularioContact.value.pnumber,
      facebook: this.formularioContact.value.facebook,
      instagram: this.formularioContact.value.instagram,
      mercadoLibre: this.formularioContact.value.mercadoLibre,
    }
    this.$dbc.updateContacto(id, contacto)
    this.toast.info("Se ha actualizado exitosamente a la información de la empresa.", "Información actualizada", {positionClass: 'toast-bottom-right', closeButton: true})

  }

}



