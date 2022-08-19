import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allDeptos: any = [];
  allTours: any = [];
  allCompras: any = [];
  allUsers: any = [];

  showArriendos: boolean = false;
  showTours: boolean = false;
  showCompras: boolean = false;
  showUsuarios: boolean = false;
  newDepartamento: boolean = false;
  newtours: boolean = false;
  newUsuario: boolean = false;
  editUsuario: boolean = false;

  usuarioTmp: string = ''

  constructor(private sS: ServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.mostrarArriendos();
  }

  mostrarArriendos() {
    return this.sS.getDepartamentos().subscribe((data: {}) => {
      this.allDeptos = data;
      console.log(this.allDeptos);
      this.showArriendos = true;
      this.showTours = false;
      this.showCompras = false;
      this.showUsuarios = false;
      this.newDepartamento = false;
      this.newtours = false;
      this.newUsuario = false;
      this.editUsuario = false;
    });
  }

  mostrarTours() {
    return this.sS.getTours().subscribe((data: {}) => {
      this.allTours = data;
      console.log(this.allTours);
      this.showArriendos = false;
      this.showTours = true;
      this.showCompras = false;
      this.showUsuarios = false;
      this.newDepartamento = false;
      this.newtours = false;
      this.newUsuario = false;
      this.editUsuario = false;
    });
  }

  mostrarCompras() {
    return this.sS.getVentas().subscribe((data: {}) => {
      this.allCompras = data;
      console.log(this.allCompras);
      this.showArriendos = false;
      this.showTours = false;
      this.showCompras = true;
      this.showUsuarios = false;
      this.newDepartamento = false;
      this.newtours = false;
      this.newUsuario = false;
      this.editUsuario = false;
    });

  }

  mostrarUsuarios() {
    return this.sS.getUsuarios().subscribe((data: {}) => {
      this.allUsers = data;
      console.log(this.allUsers);
      this.showArriendos = false;
      this.showTours = false;
      this.showCompras = false;
      this.showUsuarios = true;
      this.newDepartamento = false;
      this.newtours = false;
      this.newUsuario = false;
      this.editUsuario = false;
    });
  }

  newDepto(){
    this.newDepartamento = true;
    this.newtours = false;
    this.newUsuario = false;
    this.showArriendos = false;
    this.showTours = false;
    this.showCompras = false;
    this.showUsuarios =false;
    this.editUsuario = false;
  }

  newTour(){
    this.newDepartamento = false;
    this.newtours = true;
    this.newUsuario = false;
    this.showArriendos = false;
    this.showTours = false;
    this.showCompras = false;
    this.showUsuarios =false;
    this.editUsuario = false;
  }

  newUser(){
    this.newDepartamento = false;
    this.newtours = false;
    this.newUsuario = true;
    this.showArriendos = false;
    this.showTours = false;
    this.showCompras = false;
    this.showUsuarios =false;
    this.editUsuario = false;
  }

  editUser(){
    this.newDepartamento = false;
    this.newtours = false;
    this.newUsuario = false;
    this.showArriendos = false;
    this.showTours = false;
    this.showCompras = false;
    this.showUsuarios =false;
    this.editUsuario = true;
  }

  editarDepto(id: any){

  }

  eliminarDepto(id: any){
    this.sS.eliminaDepartamento(id).subscribe(() => this.mostrarArriendos());
    this.toastr.success('Item eliminado con éxito', 'Eliminación');
  }

  editarTour(id: any){

  }

  eliminarTour(id: any){
    this.sS.eliminaTour(id).subscribe(() => this.mostrarTours());
    this.toastr.success('Item eliminado con éxito', 'Eliminación');
  }

  editarVenta(id: any){

  }

  eliminarVenta(id: any){
    this.sS.eliminaVenta(id).subscribe(() => this.mostrarCompras());
    this.toastr.success('Item eliminado con éxito', 'Eliminación');
    //window.location.reload();
  }

  editarUsuario(id: any){

    this.editUser();
    this.usuarioTmp = id;
    console.log('usuario a editar:', id);
    
  }

  eliminarUsuario(id: any){
    this.sS.eliminaUsuario(id).subscribe(() => this.mostrarUsuarios());
    this.toastr.success('Item eliminado con éxito', 'Eliminación');
  }
}
