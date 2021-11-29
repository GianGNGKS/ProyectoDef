import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Router } from '@angular/router';

//auth
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //variable de usuario
  user!: Observable<any>

  constructor(private auth: AngularFireAuth, private router: Router) {
    //suscripción al servicio de auth
    this.user = auth.authState
  }

  //iniciar sesión con username(correo) y password
  login(username: string, password: string) {
    return this.auth.signInWithEmailAndPassword(username, password);
  }

  //cerrar sesión
  logout() {
    return this.auth.signOut();
  }

  //llama a router para ir a admin
  moveToAdmin() {
    this.router.navigate(['/test'])
  }

  //checkea si hay usuario
  sessionCheck() {
    return this.user
  }

}
