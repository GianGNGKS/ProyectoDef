import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {


  //arreglos de collecciones fotos y contactos
  pictures!: any[];

  contacts!: any[];

  constructor(private $dbpi:CarouselService, private $dbc:ContactService) {
    //suscribe al servicio de fotos de carousel y contacts (para nombre de empresa)
    this.$dbpi.getPictures().subscribe((resp => {
      this.pictures = resp;
    }))
    this.$dbc.getContactos().subscribe((resp => {
      this.contacts = resp;
    }))
  }

  ngOnInit(): void {}

}
