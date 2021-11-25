import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//auth
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!:Observable<any>
  
  constructor(private auth:AngularFireAuth, private router:Router) {
    this.user = auth.authState
  }

  login(username:string, password:string){
    return this.auth.signInWithEmailAndPassword(username, password);
  }

  logout(){
    return this.auth.signOut();
  }

  moveToAdmin(){
    this.router.navigate(['/admin'])
  }

  sessionCheck(){
    return this.user
  }

}
