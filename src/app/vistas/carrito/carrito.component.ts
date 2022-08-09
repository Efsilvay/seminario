import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
//import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare var require: any;
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  item: any = [];
  allDatos: any = [];
  cantDepto: number = 0;
  cantTour: number = 0;
  total: number = 0;

  logeado: boolean = false;
  valorLocal: any = null;

  todayDate: string = new Date().toLocaleDateString();

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
    password: null
  }

  formularioOk: boolean = false;
  classBoton = "btn-primary disabled";

  public registerForm: FormGroup;

  constructor(private sS: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.valorLocal = localStorage.getItem('token');
    console.log('valor de local Storage' + this.valorLocal)
    if (this.valorLocal == "LOGGED_IN") {
      this.logeado = true;
    } else {
      this.logeado = false;
    }
    this.cargarCarrito();

  }

  cargarCarrito() {
    return this.sS.getReservas().subscribe((data: {}) => {
      this.allDatos = data;
      console.log(this.allDatos);
      for (let i = 0; i < this.allDatos.length; i++) {
        if (this.allDatos[i].depto == true) {
          this.cantDepto = this.cantDepto + 1;
        }
        if (this.allDatos[i].tour == true) {
          this.cantTour = this.cantTour + 1;
        }
        this.total = this.total + (this.allDatos[i].valor * this.allDatos[i].cantidad);
      }
    });

  }

  eliminar(id: any) {
    this.sS.eliminaReserva(id).subscribe(() => this.cargarCarrito());
    this.toastr.success('Item eliminado con éxito', 'Eliminación');
    window.location.reload();
  }


  cargarSeleccion(id: any) {
    return this.sS.getReserva(id).subscribe((data: {}) => {
      this.item = data;
    });
  }

  downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    let html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();

  }

  validaFormulario(value: any, tipo: string) {

    if (
      (this.usuario.rut !== null) &&
      (this.usuario.nombre !== null) &&
      (this.usuario.apellido !== null) &&
      (this.usuario.telefono !== null) &&
      (this.usuario.celular !== null) &&
      (this.usuario.email !== null)
    ) {
      this.classBoton = "btn-primary";
      this.formularioOk = true;
    } else {
      this.classBoton = "btn-primary disabled";
    }
    console.log('datos:', this.usuario)
    console.log('formulario ok: ', this.formularioOk)
  }

  limpiarFormulario() {
    this.usuario.rut = null;
    this.usuario.nombre = null;
    this.usuario.apellido = null;
    this.usuario.telefono = null;
    this.usuario.celular = null;
    this.usuario.email = null;
    this.classBoton = "btn-primary disabled";
    this.formularioOk = false;
  }

  registrar(form: NgForm) {

    if (form.valid && this.formularioOk == true) {
      this.sS.agregaUsuario(this.usuario)
        .subscribe(
          (datos) => {

            console.log('usuario ingresado con éxito', 'Confirmación');

          },
          (err) => {
            console.log('Hubo un error en el envío, favor intentar nuevamente', 'Error');
          }
        );
      this.limpiarFormulario();
    }
  }
}