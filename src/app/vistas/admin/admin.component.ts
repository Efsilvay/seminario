import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/servicios/service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allDeptos: any = [];
  allTours: any = [];
  allCompras: any = [];
  allUsers: any = [];

  showArriendos: boolean = false;
  showTours: boolean = false;
  showCompras: boolean = false;
  showUsuarios: boolean = false;

  constructor(private sS: ServiceService) { }

  ngOnInit(): void {
  }

  mostrarArriendos() {
    return this.sS.getDepartamentos().subscribe((data: {}) => {
      this.allDeptos = data;
      console.log(this.allDeptos);
      this.showArriendos = true;
      this.showTours = false;
      this.showCompras = false;
      this.showUsuarios = false;
    });
  }

  mostrarTours() {
    return this.sS.getTours().subscribe((data: {}) => {
      this.allTours = data;
      console.log(this.allTours);
      this.showArriendos = false;
      this.showTours = true;
      this.showCompras = false;
      this.showUsuarios = false;
    });
  }

  mostrarCompras() {
    return this.sS.getVentas().subscribe((data: {}) => {
      this.allCompras = data;
      console.log(this.allCompras);
      this.showArriendos = false;
      this.showTours = false;
      this.showCompras = true;
      this.showUsuarios = false;
    });

  }

  mostrarUsuarios() {
    return this.sS.getUsuarios().subscribe((data: {}) => {
      this.allUsers = data;
      console.log(this.allUsers);
      this.showArriendos = false;
      this.showTours = false;
      this.showCompras = false;
      this.showUsuarios = true;
    });
  }
}
