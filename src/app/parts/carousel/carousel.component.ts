import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  currentPage!: any; 
  titlepage!: string;

  constructor(private router:Router) {
    this.currentPage = '';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url;
        console.log(this.currentPage);
        if(this.currentPage == '/home'){
          this.titlepage = 'Bienvenido'
          console.log(this.titlepage);
        }
        else if(this.currentPage == '/faq'){
          this.titlepage = 'Preguntas frecuentes e información'
          console.log(this.titlepage);
        }
        else if(this.currentPage == '/product'){
          this.titlepage = 'Nuestros productos'
          console.log(this.titlepage);
        }
        else if(this.currentPage == '/admin'){
          this.titlepage = 'Configuración del sitio'
          console.log(this.titlepage);
        }
      }
    })

  }

  ngOnInit(): void {}

}
