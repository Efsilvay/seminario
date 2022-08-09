import { Component, OnInit, NgZone } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  item: any = [];
  id: any;

  departamento = {
    depto: true,
    tour: false,
    titulo: "",
    imagen: "",
    detalle: "",
    valor: 0,
    cantidad: 1,
  }

  /*item = {
    id: null,
    titulo: null,
    imagen: null,
    detalle: null,
    precio: null
  }*/

  constructor(private sS:ServiceService, private http: HttpClient, private ngZone: NgZone,
    private router: Router,
    private actRoute: ActivatedRoute,) { 
      this.id = this.actRoute.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.cargarDepartamento();
  }

  cargarDepartamento() {
    return this.sS.getDepartamento(this.id).subscribe((data: {}) => {
      this.item = data;
      console.log('cantidad items:',this.item)
    });

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
