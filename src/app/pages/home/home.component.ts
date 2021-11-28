import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products!: any[]

  constructor(private $db:FirestoreService) {
    this.$db.getProductoCarousel().subscribe((resp => {
        this.products = resp;
      }))
    }

  ngOnInit(): void {
  }


}
