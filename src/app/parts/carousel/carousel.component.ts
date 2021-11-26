import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  pictures!: any[];

  constructor(private $dbpi:CarouselService) {
    this.$dbpi.getPictures().subscribe((resp => {
      this.pictures = resp;
    }))
  }

  ngOnInit(): void {}

}
