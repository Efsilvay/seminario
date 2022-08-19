import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './vistas/login/login.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { MenuComponent } from './vistas/menu/menu.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { CarritoComponent } from './vistas/carrito/carrito.component';
import { PagoComponent } from './vistas/pago/pago.component';
import { CheckoutComponent } from './vistas/checkout/checkout.component';
import { NavbarComponent } from './vistas/navbar/navbar.component';
import { FooterComponent } from './vistas/footer/footer.component';
import { Error404Component } from './vistas/error404/error404.component';
import { DepartamentosComponent } from './vistas/departamentos/departamentos.component';
import { ToursComponent } from './vistas/tours/tours.component';
import { ServiciosComponent } from './vistas/servicios/servicios.component';
import { NosotrosComponent } from './vistas/nosotros/nosotros.component';
import { MantenedorComponent } from './vistas/mantenedor/mantenedor.component';
import { AdminComponent } from './vistas/admin/admin.component';
import { DepartamentoComponent } from './vistas/departamento/departamento.component';
import { TourComponent } from './vistas/tour/tour.component';
import { ItemsComponent } from './vistas/admin/items/items.component';
import { AddDeptoComponent } from './vistas/admin/add-depto/add-depto.component';
import { AddTourComponent } from './vistas/admin/add-tour/add-tour.component';
import { AddUserComponent } from './vistas/admin/add-user/add-user.component';
import { EditUserComponent } from './vistas/admin/edit-user/edit-user.component';

import { CustomTypeUser } from './shared/pipes/customTypeUser';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    PerfilComponent,
    CarritoComponent,
    PagoComponent,
    CheckoutComponent,
    NavbarComponent,
    FooterComponent,
    Error404Component,
    DepartamentosComponent,
    ToursComponent,
    ServiciosComponent,
    NosotrosComponent,
    MantenedorComponent,
    AdminComponent,
    DepartamentoComponent,
    TourComponent,
    ItemsComponent,
    AddDeptoComponent,
    AddTourComponent,
    AddUserComponent,
    EditUserComponent,
    CustomTypeUser
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
