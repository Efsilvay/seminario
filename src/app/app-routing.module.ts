import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './vistas/admin/admin.component';
import { CarritoComponent } from './vistas/carrito/carrito.component';
import { CheckoutComponent } from './vistas/checkout/checkout.component';
import { DepartamentosComponent } from './vistas/departamentos/departamentos.component';
import { DepartamentoComponent } from './vistas/departamento/departamento.component';
import { Error404Component } from './vistas/error404/error404.component';
import { LoginComponent } from './vistas/login/login.component';
import { MantenedorComponent } from './vistas/mantenedor/mantenedor.component';
import { MenuComponent } from './vistas/menu/menu.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { ServiciosComponent } from './vistas/servicios/servicios.component';
import { ToursComponent } from './vistas/tours/tours.component';
import { TourComponent } from './vistas/tour/tour.component';


const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'departamentos', component: DepartamentosComponent},
  {path: 'departamentos/departamento/:id', component: DepartamentoComponent},
  {path: 'tours', component: ToursComponent},
  {path: 'tours/tour/:id', component: TourComponent},
  {path: 'servicios', component: ServiciosComponent},
  {path: 'mantenedor', component: MantenedorComponent},
  {path: 'admin', component: AdminComponent},

  //{path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard]},
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
