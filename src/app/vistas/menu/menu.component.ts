import { Component, OnInit } from '@angular/core';
import { Departamentos, ServiceService } from 'src/app/servicios/service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  allDatos: any;
  filterDatos: any;
  departamento = {
    depto: true,
    tour: false,
    titulo: "",
    imagen: "",
    detalle: "",
    valor: 0,
    cantidad: 1,
  }

  constructor(private sS:ServiceService, private router: Router) { }

  ngOnInit() {
    //window.location.reload();
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    return this.sS.getDepartamentos().subscribe((data: {}) => {
      this.allDatos = data;
      this.filterDatos = this.allDatos.filter((x: { id: number; }) => x.id < 4)
      console.log(this.allDatos)
      console.log(this.filterDatos)
    });

  }

  verDetalle(id:any){
    this.router.navigate(['/departamentos/departamento/'+id]);
}

guardarReserva(titulo:any,imagen:any, detalle:any, valor: any){
  this.departamento.titulo = titulo;
  this.departamento.imagen = imagen;
  this.departamento.detalle = detalle;
  this.departamento.valor = valor;
  console.log('valor a ingresar: ',this.departamento);
  return this.sS.agregaReserva(this.departamento)
  .subscribe(
    (datos: any) => {
      console.log('usuario ingresado con éxito', 'Confirmación');
      this.router.navigate(['/carrito']);
    },
    (err: any) => {
      console.log('Hubo un error en el envío, favor intentar nuevamente', 'Error');
    }
  );;
}

}
