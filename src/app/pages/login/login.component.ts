import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputSession: FormGroup;
  user!: any


  constructor(private formularioSesion: FormBuilder, private authSession: AuthService, private router: Router, private toast: ToastrService) {
    this.inputSession = this.formularioSesion.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.authSession.sessionCheck().subscribe(resp => {
      this.user = resp
    })
  }

  ngOnInit(): void {
  }

  logIn() {
    this.authSession.login(this.inputSession.value.username, this.inputSession.value.password).then( () =>{
      this.router.navigate(['/test']);
    }).catch(error => {
      this.toast.error('Usuario y contraseña incorrectos','No se ha podido iniciar sesión')
    })
      
    
  }
}
