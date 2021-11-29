import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/models/product.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // producto
  products!: any[]
  SelectedProduct: any;

  // modal
  modalActive!: boolean;


  constructor(private $db:FirestoreService) {
    //suscripción al servicio de productos
  this.$db.getProductos().subscribe((resp => {
      this.products = resp;
    }))

    //desabilita modal para ver detalles del producto
    this.modalActive = false    
  }

  ngOnInit(): void {
    
  }

  //conexión de X producto con modal
  SeleccionarProducto(product: producto){
    this.modalActive = true;
    this.SelectedProduct =  product;
  }
  
}
