import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  contacts!: any[]

  constructor(private $db: ContactService) {
    this.$db.getContactos().subscribe((resp => {
      this.contacts = resp;
    }))
  }

  ngOnInit(): void {
  }

}
