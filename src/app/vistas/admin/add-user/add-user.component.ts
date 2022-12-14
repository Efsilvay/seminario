import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  usuario = {
    rut: null,
    nombre: null,
    apellido: null,
    direccion: null,
    comuna: null,
    ciudad: null,
    telefono: null,
    celular: null,
    email: null,
    password: null,
    rol: "2"
  }

  cargando: boolean = false;
  msg: string = "";
  formularioOk: boolean = false;
  classBoton = "btn-primary disabled";

  finalizado: boolean = false;
  
  public registerForm: FormGroup;

  constructor(private sS: ServiceService) { }

  ngOnInit() {
    this.finalizado = false;
    this.registerForm = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      retypePassword: new FormControl(null, Validators.required),
    });
    console.log(this.registerForm)
  }

  /*register() {

    if (this.registerForm.controls.nombre.value == null) {
      console.log(this.registerForm)
      //this.sS.register();
    } else {
      console.log("Error")
    }
  }*/

  validaFormulario(value: any, tipo: string) {

    if (
      (this.usuario.rut !== null) &&
      (this.usuario.nombre !== null) &&
      (this.usuario.apellido !== null) &&
      (this.usuario.direccion !== null) &&
      (this.usuario.comuna !== null) &&
      (this.usuario.ciudad !== null) &&
      (this.usuario.telefono !== null) &&
      (this.usuario.celular !== null) &&
      (this.usuario.email !== null) &&
      (this.usuario.password !== null)
    ) {
      this.classBoton = "btn-primary";
      this.formularioOk = true;
    } else {
      this.classBoton = "btn-primary disabled";
    }
    console.log('datos:', this.usuario)
    console.log('formulario ok: ', this.formularioOk)
  }

  limpiarFormulario(){ 
    this.usuario.rut = null;
    this.usuario.nombre = null;
    this.usuario.apellido = null;
    this.usuario.direccion = null;
    this.usuario.comuna = null;
    this.usuario.ciudad = null;
    this.usuario.telefono = null;
    this.usuario.celular = null;
    this.usuario.email = null;
    this.usuario.password = null;
    this.classBoton = "btn-primary disabled";
    this.formularioOk = false;
  }

  registrar(form: NgForm) {

    if(form.valid && this.formularioOk == true){
      this.sS.agregaUsuario(this.usuario)
      .subscribe(
        (datos) => {
          this.cargando = true;
          this.finalizado = true;
          console.log('usuario ingresado con ??xito', 'Confirmaci??n');
        },
        (err) => {
          this.cargando = false;
          this.finalizado = false;
          console.log('Hubo un error en el env??o, favor intentar nuevamente', 'Error');
        }
      );
      this.limpiarFormulario();
    }
    
  }

}
