import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion.page';

@Component({
  selector: 'app-registro-barberias',
  templateUrl: './registro-barberias.page.html',
  styleUrls: ['./registro-barberias.page.scss'],
})
export class RegistroBarberiasPage implements OnInit {

  token: string = '';
  barberia = {
    nombre: '',
    documento: '',
    direccion: '',
    ciudad: '',
    correo: '',
    telefono: '',
    correo_electronico: '',
    es_barberia: true
  };

  ciudades: string[] = [];

  constructor(
    public servicio: DataService, 
    public loading: LoadingController,
    public inicioSesion: InicioSesionPage) { }

  ngOnInit() {}

  ionViewWillEnter()
  {
    this.inicioSesion.validarSesion();
    this.cargarCiudades();
  }

  cargarCiudades()
  {
    this.servicio.getToken().subscribe((data: any) => {

      this.token = data.access_token;
      this.obtenerCiudades({token: this.token});

    }, error => {
      this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
    });
  }

  async obtenerCiudades(data: any)
  {
    let load = await this.loading.create();
    load.present();

    this.servicio.cargarCiudades({
      access_token: data.token
    }).subscribe((data: any) => {
      this.ciudades = data.Ciudad;
      load.dismiss();
    }, response => {
      let msg = response.error.error.message;
      this.servicio.mensaje(msg, 'danger');
      load.dismiss();
    });
  }

 async  onSubmitForm()
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.getToken().subscribe((data: any) => {

      this.token = data.access_token;
      this.registro({token: this.token});
      load.dismiss();

    }, error => {
      this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
      load.dismiss();
    });
  }

 async  registro(data: any)
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.registroBarberias({
      nombre: this.barberia.nombre,
      documento: this.barberia.documento,
      direccion: this.barberia.direccion,
      ciudad: this.barberia.ciudad,
      telefono: this.barberia.telefono,
      correo_electronico: this.barberia.correo_electronico,
      es_barberia: this.barberia.es_barberia,
      access_token: data.token

    }).subscribe((data: any) => {
      let msg = data.Data.message;
      this.servicio.mensaje(msg, 'success');
      this.servicio.routeTo('/barberias');
      load.dismiss();
    }, response => {
      let msg = response.error.error.message;
      this.servicio.mensaje(msg, 'danger');
      load.dismiss();
    });
  }

}
