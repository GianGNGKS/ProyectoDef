import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//partes
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

//paginas
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminComponent } from './pages/admin/admin.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'product', component: ProductComponent
  },
  {
    path: 'faq', component: FaqComponent
  },
  {
    path: 'admin', component: AdminComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '*', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
