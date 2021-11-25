import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!:any

  constructor(private auth: AuthService, private router: Router) { 
    this.auth.sessionCheck().subscribe(resp => {
      this.user = resp
    })
  }

  ngOnInit(): void {
  }

  logIn(){
    if(!this.user){
      this.router.navigate(['/login'])
    }
  }

}
