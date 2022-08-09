import { Component, OnInit, NgZone  } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  item: any = [];
  id: any;

  tour = {
    depto: false,
    tour: true,
    titulo: "",
    imagen: "",
    detalle: "",
    valor: 0,
    fecha: "",
    cantidad: 1,
    dias: 1,
  }

  constructor(private sS:ServiceService, private http: HttpClient, private ngZone: NgZone,
    private router: Router,
    private actRoute: ActivatedRoute,) { 
      this.id = this.actRoute.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
      this.cargarTour();
    }
  
    cargarTour() {
      return this.sS.getTour(this.id).subscribe((data: {}) => {
        this.item = data;
        console.log('cantidad items:',this.item)
      });
  
    }

    cambiarCantidad(event:any){
      return this.tour.cantidad = event.target.value;
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
          this.router.navigate(['/carrito']);
        },
        (err: any) => {
          console.log('Hubo un error en el envío, favor intentar nuevamente', 'Error');
        }
      );
    }
}
