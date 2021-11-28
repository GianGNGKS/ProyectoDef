import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  pictures!: any[];

  contacts!: any[];

  constructor(private $dbpi:CarouselService, private $dbc:ContactService) {
    this.$dbpi.getPictures().subscribe((resp => {
      this.pictures = resp;
    }))
    this.$dbc.getContactos().subscribe((resp => {
      this.contacts = resp;
    }))
  }

  ngOnInit(): void {}

}
