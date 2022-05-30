import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  token: string = '';

  registro = {
    nombres: '',
    apellidos: '',
    usuario: '',
    tipo_documento: '',
    documento: '',
    correo: '',
    contrasenia: '',
    confirmContrasenia: '',
    tipoCliente: ''
  };

  tipo_documento: string[] = [];
  roles: string[] = [];

  constructor(
    public servicio: DataService, 
    public loading: LoadingController) {}

  ngOnInit() {}

  ionViewWillEnter()
  {
    this.cargarTiposDocumento();
    this.cargarRoles();
  }

  cargarTiposDocumento()
  {
    this.servicio.getToken().subscribe((data: any) => {
      this.token = data.access_token;
      this.obtenerDocumentos({token: this.token});
    }, error => {
      this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
    });
  }

  cargarRoles()
  {
    this.servicio.getToken().subscribe((data: any) => {
      this.token = data.access_token;
      this.obtenerRoles({token: this.token});
    }, error => {
      this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
    });
  }

  async obtenerDocumentos(data: any)
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.obtenerDocumentos({
      access_token: data.token
    }).subscribe((data: any) => {
      this.tipo_documento = data.TipoDocumento;
      load.dismiss();
    }, response => {
      let msg = response.error.error.message;
      this.servicio.mensaje(msg, 'danger');
      load.dismiss();
    });
  }

  async obtenerRoles(data: any)
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.obtenerRoles({
      access_token: data.token
    }).subscribe((data: any) => {

      this.roles = data.Roles;
      load.dismiss();
    }, response => {
      let msg = response.error.error.message;
      this.servicio.mensaje(msg, 'danger');
      load.dismiss();
    });
  }

  async onSubmitForm() {

    let load = await this.loading.create();
    load.present();
    this.servicio.getToken().subscribe((data: any) => {
      this.token = data.access_token;
      this.registroUsuario({token: this.token});
      load.dismiss();
    }, error => {
      this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
      load.dismiss();
    });
  }

  async registroUsuario(data: any)
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.registroUsuarios({
      nombres: this.registro.nombres,
      apellidos: this.registro.apellidos,
      tipo_documento: this.registro.tipo_documento,
      documento: this.registro.documento,
      correo: this.registro.correo,
      rol: this.registro.tipoCliente,
      access_token: data.token
    }).subscribe((data: any) => {
     let msg = data.Data.message;
     this.servicio.mensaje(msg, 'success');
     this.servicio.routeTo('/inicio-sesion');
      load.dismiss();
    }, response => {
      let msg = response.error.error.message;
      this.servicio.mensaje(msg, 'danger');
      load.dismiss();
    });
  }
}
