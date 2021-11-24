import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ModalFaqComponent } from './parts/modal-faq/modal-faq.component';
import { TestComponent } from './parts/test/test.component';

const routes: Routes = [
  {
    path:'home',component: HomeComponent
  },
  {
    path:'product',component: ProductComponent
  },
  {
    path:'faq',component:FaqComponent
  },
  {
    path:'modalfaq',component:ModalFaqComponent
  },
  {
    path:'admin',component:AdminComponent
  },
  {
    path:'', redirectTo: 'home', pathMatch:'full'
  },
  {
    path:'*', redirectTo: 'home', pathMatch:'full'
  },{
    path:'test',component:TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
