import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logeado: boolean  = false;
  valorLocal: any = null;
  rol: any = "";
  admin: boolean = false;

  constructor(private ss: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.valorLocal = localStorage.getItem('token');
    this.rol = localStorage.getItem('rolUser');
    console.log('valor de local Storage' + this.valorLocal)
    if(this.valorLocal == "LOGGED_IN"){
      this.logeado = true;
    }else{
      this.logeado = false;
    }
    if(this.rol == "1"){
      this.admin = true;
    }else{
      this.admin = false;
    }
  }

  logout(){
    this.logeado = false;
    this.ss.logout();
    this.router.navigate(['/']);
  }

}
