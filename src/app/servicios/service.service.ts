import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(){
    return this.http.get<Array<Usuarios>>(environment.rest.usuarios);
  }

  getUsuario(id: any) : Observable<Usuarios>{
    return this.http.get<Usuarios>(`${environment.rest.usuarios}/${id}`);
  }

  agregaUsuario(body: any) {
    return this.http.post<Usuarios>(environment.rest.usuarios, body);
  }
  
  editaUsuario(body: Usuarios){
    return this.http.put<Usuarios>(`${environment.rest.usuarios}/${body.id}`,body);
  }

  eliminaUsuario(id: any): Observable<Usuarios>{
    return this.http.delete<Usuarios>(`${environment.rest.usuarios}/${id}`);
  }

  getDepartamentos(){
    return this.http.get<Array<Departamentos>>(environment.rest.departamentos);
  }

  getDepartamento(id: any){
    return this.http.get<Array<Departamentos>>(`${environment.rest.departamentos}/${id}`);
  }

  getTours(){
    return this.http.get<Array<Tours>>(environment.rest.tours);
  }

  getTour(id: any){
    return this.http.get<Array<Tours>>(`${environment.rest.tours}/${id}`);
  }

  getReserva(id: any){
    return this.http.get<Array<any>>(`${environment.rest.reservas}/${id}`);
  }

  getReservas(){
    return this.http.get<Array<Carro>>(environment.rest.reservas);
  }

  editaReserva(body:any){
    return this.http.put<Array<Carro>>(`${environment.rest.reservas}/${body.id}`,body);
  }

  agregaReserva(body: any) {
    console.log('recibido: ', body)
    return this.http.post<Carro>(environment.rest.reservas, body); 
  }

  eliminaReserva(id: any): Observable<Carro>{
    return this.http.delete<Carro>(`${environment.rest.reservas}/${id}`);
  }

  getVenta(id: any){
    return this.http.get<Array<any>>(`${environment.rest.ventas}/${id}`);
  }

  getVentas(){
    return this.http.get<Array<Carro>>(environment.rest.ventas);
  }

  editaVenta(body:any){
    return this.http.put<Array<Carro>>(`${environment.rest.ventas}/${body.id}`,body);
  }

  agregaVenta(body: any) {
    console.log('recibido: ', body)
    return this.http.post<Carro>(environment.rest.ventas, body); 
  }

  eliminaVenta(id: any): Observable<Carro>{
    return this.http.delete<Carro>(`${environment.rest.ventas}/${id}`);
  }


  login(id: any, rol:any) {
    localStorage.setItem('token', 'LOGGED_IN');
    localStorage.setItem('userId', id);
    localStorage.setItem('rolUser', rol);
    //this.router.navigate(['/menu']);
  }

  register() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('rolUser');
    window.location.reload();
    this.router.navigate(['/menu']);
  }
}

export interface Usuarios {
  id?: number,
  rut: string,
  nombre: string,
  apellido: string,
  direccion: string,
  comuna: string,
  ciudad: string,
  telefono: number,
  celular: number,
  email: string,
  password: string
}

export interface Menu {
  id: number,
  item: string,
  valor:number,
  ingredientes:string,
  imagen: string
}

export interface Departamentos {
  id: number,
  titulo: string,
  imagen: string,
  detalle: string,
  precio: number
}

export interface Tours {
  id: number,
  item: string,
  valor:number,
  ingredientes:string,
  imagen: string
}

export interface Carro {
  id?: number,
  item: string,
  valor:number,
  ingredientes:string,
  imagen: string
}
