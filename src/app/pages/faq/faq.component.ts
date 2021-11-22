import { Component, OnInit } from '@angular/core';

import { pregunta } from 'src/app/models/faq.interface';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  preguntas!:any[]

  constructor(private $db:FaqService) {
    this.$db.getPreguntas().subscribe((resp => {
      this.preguntas = resp;
    }))
  }

  ngOnInit(): void {
  }

}
