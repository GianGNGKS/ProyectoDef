import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  //arreglo de contactos
  contacts!: any[]

  constructor(private $db: ContactService) {
    //suscripción al servicio de contacto
    this.$db.getContactos().subscribe((resp => {
      this.contacts = resp;

    }))
  }

  ngOnInit(): void {
  }
}
