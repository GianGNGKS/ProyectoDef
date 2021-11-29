import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //variable para afirmar login de usuario
  user!:any

  constructor(private auth: AuthService, private router: Router) { 
    //suscripción al servicio de auth
    this.auth.sessionCheck().subscribe(resp => {
      this.user = resp
    })
  }

  ngOnInit(): void {
  }

  logIn(){
    //si usuario no existe, navega a login
    if(!this.user){
      this.router.navigate(['/login'])
    }
  }

}
