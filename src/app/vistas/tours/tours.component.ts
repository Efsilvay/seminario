import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {

  allTours: any = [];

  tour = {
    depto: false,
    tour: true,
    titulo: "",
    imagen: "",
    detalle: "",
    valor: 0,
    fecha: "",
    dias: 1,
  }

  constructor(private sS:ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.cargarTours();
  }

  cargarTours() {
    return this.sS.getTours().subscribe((data: {}) => {
      this.allTours = data;
      console.log(this.allTours)
    });

  }

  verDetalle(id:any){
    this.router.navigate(['/tours/tour/'+id]);
}

  guardarReserva(titulo:any,imagen:any, detalle:any, valor: any,fecha: any){
    this.tour.titulo = titulo;
    this.tour.imagen = imagen;
    this.tour.detalle = detalle;
    this.tour.valor = valor;
    this.tour.fecha = fecha;
    console.log('valor a ingresar: ',this.tour);
    return this.sS.agregaReserva(this.tour)
    .subscribe(
      (datos: any) => {
        console.log('usuario ingresado con éxito', 'Confirmación');
      },
      (err: any) => {
        console.log('Hubo un error en el envío, favor intentar nuevamente', 'Error');
      }
    );;
  }


}
