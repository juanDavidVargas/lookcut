import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion.page';

@Component({
  selector: 'app-edicion-barberias',
  templateUrl: './edicion-barberias.page.html',
  styleUrls: ['./edicion-barberias.page.scss'],
})
export class EdicionBarberiasPage implements OnInit {

  public id: number = 0;
  public nombre: string = '';
  public nit: string = '';
  public direccion: string = '';
  public telefono: string = '';
  public correo: string = '';
  public es_barberia: boolean = false;
  public ciudad_id: number = 0;
  public token: string = '';
  public ciu_descripcion: string = '';
  ciudades: string[] = [];

  constructor(
    public servicio: DataService, 
    public loading: LoadingController,
    public route: ActivatedRoute,
    public inicioSesion: InicioSesionPage
  ) {
      this.id = this.route.snapshot.params.barberiaId ? this.route.snapshot.params.barberiaId : 0;
   }

  ngOnInit() {
  }

  ionViewWillEnter()
  { 
      this.inicioSesion.validarSesion();
      this.cargarCiudades();
      this.cargarBarberiaPorId();
  }

  async recargarPagina()
  {
    this.ionViewWillEnter();
  }

  cargarCiudades()
  {
    this.servicio.getToken().subscribe((data: any) => 
    {
        this.token = data.access_token;
        this.obtenerCiudades({token: this.token});
    }, error => 
    {
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

  async cargarBarberiaPorId()
  {
    this.servicio.getToken().subscribe((data: any) => 
    {
      this.token = data.access_token;
      this.obtenerBarberiaPorId({token: this.token, id: this.id});

    }, error => {
      this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
    });
  }

  async obtenerBarberiaPorId(data: any)
  {
    let load = await this.loading.create();
    load.present();

    this.servicio.cargarBarberiaPorId({
      access_token: data.token,
      id: data.id
    }).subscribe((data: any) => 
    {
      this.nombre = data.Barberia[0].descripcion;
      this.nit = data.Barberia[0].nit;
      this.direccion = data.Barberia[0].direccion;
      this.ciudad_id = data.Barberia[0].id_ciudad;
      this.ciu_descripcion = data.Barberia[0].des_ciudad;
      this.telefono = data.Barberia[0].telefono;
      this.correo = data.Barberia[0].correo;

      if(data.Barberia[0].tipo_negocio_id == 1 || data.Barberia[0].tipo_negocio_id == "1" )
      {
        this.es_barberia = true;
      }
      load.dismiss();

    }, response => {

      let msg = response.error.error.message;
      this.servicio.mensaje(msg, 'danger');
      load.dismiss();
    });
  }

  async onSubmitForm()
  {
    if(this.nombre == ''){
      this.servicio.mensaje('Debe ingresar un nombre', 'warning');
    } else if(this.nit == ''){
      this.servicio.mensaje('Debe ingresar un nit', 'warning');
    } else if(this.direccion == ''){
      this.servicio.mensaje('Debe ingresar una dirección', 'warning');
    } else if(this.ciudad_id == 0){
      this.servicio.mensaje('Debe seleccionar una ciudad', 'warning');
    } else if(this.telefono == ''){
      this.servicio.mensaje('Debe ingresar un número de teléfono', 'warning');
    } else if(this.correo == ''){
      this.servicio.mensaje('Debe ingresar un correo', 'warning');
    } else {

      let load = await this.loading.create();
      load.present();

      this.servicio.getToken().subscribe((data: any) => {

        this.token = data.access_token;
        this.edicionBarberia({token: this.token});
        load.dismiss();

      }, error => {
        this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
        load.dismiss();
      });
    }
  }

  async  edicionBarberia(data: any)
  {
    let load = await this.loading.create();
    load.present();

    this.servicio.editarBarberia({

      id: this.id,
      nombre: this.nombre,
      documento: this.nit,
      direccion: this.direccion,
      ciudad: this.ciudad_id,
      telefono: this.telefono,
      correo_electronico: this.correo,
      es_barberia: this.es_barberia,
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
