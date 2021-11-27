import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'



import { environment } from 'src/environments/environment';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { CarouselComponent } from './parts/carousel/carousel.component';
import { ModalProductoComponent } from './parts/modal-producto/modal-producto.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ModalFaqComponent } from './parts/modal-faq/modal-faq.component';
import { FooterComponent } from './parts/footer/footer.component';
import { TestComponent } from './parts/test/test.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministatorComponent } from './pages/administator/administator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductComponent,
    CarouselComponent,
    ModalProductoComponent,
    FaqComponent,
    AdminComponent,
    ModalFaqComponent,
    FooterComponent,
    TestComponent,
    LoginComponent,
    AdministatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
