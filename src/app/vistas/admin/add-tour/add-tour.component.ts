import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss']
})
export class AddTourComponent implements OnInit {

  tour = {
    titulo: null,
    imagen: null,
    detalle: null,
    precio: null,
    fecha: null,
    dias: null,
  }

  /*"titulo": "Recorrido por el Valle de Elqui",
      "imagen": "elqui",
      "detalle": "Duración: 8 Hrs.",
      "precio": 70188,
      "fecha": "30-05-2022",
      "dias": 1,*/

  cargando: boolean = false
  msg: string = ""
  formularioOk: boolean = false;
  classBoton = "btn-primary disabled"

  
  public registerForm: FormGroup;

  constructor(private sS: ServiceService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      detalle: new FormControl(null, Validators.required),
      precio: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      dias: new FormControl(null, Validators.required),
    });
    console.log(this.registerForm)
  }

  validaFormulario(value: any, tipo: string) {

    if (
      (this.tour.titulo !== null) &&
      (this.tour.imagen !== null) &&
      (this.tour.detalle !== null) &&
      (this.tour.precio !== null) &&
      (this.tour.fecha !== null) &&
      (this.tour.dias !== null)
    ) {
      this.classBoton = "btn-primary";
      this.formularioOk = true;
    } else {
      this.classBoton = "btn-primary disabled";
    }
    console.log('datos:', this.tour)
    console.log('formulario ok: ', this.formularioOk)
  }

  limpiarFormulario(){ 
    this.tour.titulo = null;
    this.tour.imagen = null;
    this.tour.detalle = null;
    this.tour.precio = null;
    this.tour.fecha = null;
    this.tour.dias = null;
    this.classBoton = "btn-primary disabled";
    this.formularioOk = false;
  }

  registrar(form: NgForm) {

    if(form.valid && this.formularioOk == true){
      this.sS.agregaTour(this.tour)
      .subscribe(
        (datos) => {
          this.cargando = true;
          console.log('tour ingresado con éxito', 'Confirmación');
        },
        (err) => {
          this.cargando = false;
          console.log('Hubo un error en el envío, favor intentar nuevamente', 'Error');
        }
      );
      this.limpiarFormulario();
    }
  }

}
