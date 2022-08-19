import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
//import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  user: any = [];
  logeado: boolean = false;
  valorLocal: any = null;
  idUsuario: any = null;
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
  };

  venta = {
    rut: null,
    nombre: null,
    apellido: null,
    direccion: null,
    comuna: null,
    ciudad: null,
    telefono: null,
    celular: null,
    email: null,
    items: [],
    fechaVenta: 'null',
    pagado: 0
  }

  formularioOk: boolean = false;
  classBoton = "btn-primary disabled";

  public registerForm: FormGroup;

  constructor(private sS: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    let tmpUser = undefined;
    this.valorLocal = localStorage.getItem('token');
    this.idUsuario = localStorage.getItem('userId');
    console.log('valor de local Storage' + this.valorLocal)
    if (this.valorLocal == "LOGGED_IN") {
      this.logeado = true;
      this.cargarUsuario(this.idUsuario);
      
    } else {
      this.logeado = false;
    }
    this.cargarCarrito();
  }

  cargarCarrito() {
    return this.sS.getCarritos().subscribe((data: {}) => {
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
    this.sS.eliminaCarrito(id).subscribe(() => this.cargarCarrito());
    this.toastr.success('Item eliminado con éxito', 'Eliminación');
    //window.location.reload();
  }


  cargarSeleccion(id: any) {
    return this.sS.getCarrito(id).subscribe((data: {}) => {
      this.item = data;
    });
  }

  cargarUsuario(id: any){
    let tmpUsuario: any = [];
    return this.sS.getUsuarios().subscribe((data: {}) => {
      tmpUsuario = data;
      for (let i = 0; i < tmpUsuario.length; i++) {
        if (tmpUsuario[i].id == id) {
          this.usuario.rut = tmpUsuario[i].rut;
          this.usuario.nombre = tmpUsuario[i].nombre;
          this.usuario.apellido = tmpUsuario[i].apellido;
          this.usuario.direccion = tmpUsuario[i].direccion;
          this.usuario.comuna = tmpUsuario[i].comuna;
          this.usuario.ciudad = tmpUsuario[i].ciudad;
          this.usuario.email = tmpUsuario[i].email;
          this.usuario.celular = tmpUsuario[i].celular;
        }
      }
      console.log(this.usuario);
    });
  }

  downloadAsPDF() {
    this.venta.rut = this.usuario.rut;
    this.venta.nombre = this.usuario.nombre;
    this.venta.apellido = this.usuario.apellido;
    this.venta.email = this.usuario.email;
    this.venta.direccion = this.usuario.direccion;
    this.venta.comuna = this.usuario.comuna;
    this.venta.ciudad = this.usuario.ciudad;
    this.venta.celular = this.usuario.celular;
    this.venta.fechaVenta = new Date().toLocaleDateString();
    this.venta.items = this.allDatos;
    this.venta.pagado = this.total;
    console.log('esta venta: ', this.venta);
    
    const pdfTable = this.pdfTable.nativeElement;
    let html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    
    pdfMake.createPdf(documentDefinition).download();
    return this.sS.agregaVenta(this.venta)
    .subscribe(
      (datos: any) => {
        console.log('venta ingresado con éxito', 'Confirmación');
        this.deleteAllPosts();
        this.limpiarVenta();
      },
      (err: any) => {
        console.log('Hubo un error en el envío, favor intentar nuevamente', 'Error');
      }
    );
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

  limpiarVenta(){
      this.venta.rut= null;
      this.venta.nombre= null;
      this.venta.apellido= null;
      this.venta.direccion= null;
      this.venta.comuna= null;
      this.venta.ciudad= null;
      this.venta.telefono= null;
      this.venta.celular= null;
      this.venta.email= null;
      this.venta.items= [];
      this.venta.fechaVenta= 'null';
      this.venta.pagado= 0
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

  deleteAllPosts(){
    const postsIdsArray = this.allDatos.map((post: any) => post.id);
    postsIdsArray.forEach((id: any) => this.eliminar(id));
 }
}