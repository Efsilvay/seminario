import { Component,Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Input() user: any = [];

  usuario = {
    id: 0,
    rut: '',
    nombre: '',
    apellido: '',
    direccion: '',
    comuna: '',
    ciudad: '',
    telefono: 0,
    celular: 0,
    email: '',
    password: '',
    rol: ''
  }

  cargando: boolean = false
  msg: string = ""
  formularioOk: boolean = true;
  classBoton = "btn-primary"
  finalizado: boolean = false;
  
  public registerForm: FormGroup;

  constructor(private sS: ServiceService) { }

  ngOnInit() {
    this.finalizado = false;
    console.log('idusuario', this.user)
    this.cargarUsuario(this.user);
    this.registerForm = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      retypePassword: new FormControl(null, Validators.required),
    });
    console.log(this.registerForm)
  }

  validaFormulario(value: any, tipo: string) {

    this.classBoton = "btn-primary";
    this.formularioOk = true;
    console.log('datos:', this.usuario)
    console.log('formulario ok: ', this.formularioOk)
  }

  limpiarFormulario(){ 

    this.usuario.rut = '0';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.direccion = '';
    this.usuario.comuna = '';
    this.usuario.ciudad = '';
    this.usuario.telefono = 0;
    this.usuario.celular = 0;
    this.usuario.email = '';
    this.usuario.password = '';
    this.classBoton = "btn-primary disabled";
    this.formularioOk = false;
  }

  registrar(form: NgForm) {

    if(form.valid && this.formularioOk == true){
      this.sS.editaUsuario(this.usuario)
      .subscribe(
        (datos) => {
          this.cargando = true;
          this.finalizado = true;
          console.log('usuario ingresado con éxito', 'Confirmación');
        },
        (err) => {
          this.cargando = false;
          this.finalizado = false;
          console.log('Hubo un error en el envío, favor intentar nuevamente', 'Error');
        }
      );
      this.limpiarFormulario();
    }
    
  }

  cargarUsuario(id: any){
    let tmpUsuario: any = [];
    return this.sS.getUsuarios().subscribe((data: {}) => {
      tmpUsuario = data;
      for (let i = 0; i < tmpUsuario.length; i++) {
        if (tmpUsuario[i].id == id) {
          this.usuario.id = tmpUsuario[i].id
          this.usuario.rut = tmpUsuario[i].rut;
          this.usuario.nombre = tmpUsuario[i].nombre;
          this.usuario.apellido = tmpUsuario[i].apellido;
          this.usuario.direccion = tmpUsuario[i].direccion;
          this.usuario.comuna = tmpUsuario[i].comuna;
          this.usuario.ciudad = tmpUsuario[i].ciudad;
          this.usuario.email = tmpUsuario[i].email;
          this.usuario.celular = tmpUsuario[i].celular;
          this.usuario.telefono = tmpUsuario[i].telefono;
          this.usuario.rol = tmpUsuario[i].rol;
          this.usuario.password = tmpUsuario[i].password;
        }
      }
      console.log(this.usuario);
    });
  }

}
