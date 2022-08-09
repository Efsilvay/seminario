import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  allDepartamentos: any = [];

  departamento = {
    depto: true,
    tour: false,
    titulo: "",
    imagen: "",
    detalle: "",
    valor: 0,
    cantidad: 1
  }

  constructor(private sS:ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    return this.sS.getDepartamentos().subscribe((data: {}) => {
      this.allDepartamentos = data;
      console.log(this.allDepartamentos)
    });

  }

  verDetalle(id:any){
      this.router.navigate(['/departamentos/departamento/'+id]);
  }

  guardarReserva(titulo:any, imagen: any, detalle: any, valor: any){
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
