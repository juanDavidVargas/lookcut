import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {

  usuario = {
    correo: '',
    password: '',
    username: ''
  };

  sesion_usuario = {
    usuario: '',
    sesion_iniciada: false,
    id_usuario: 0
  };

  token: string = '';

  constructor(
    public servicio: DataService, 
    public loading: LoadingController) { }

  ngOnInit() {
  }

  onSubmitTemplate()
  {
    this.getToken();
  }

  async getToken()
  {
    let load = await this.loading.create();
    load.present();

    this.servicio.getToken().subscribe((data: any) => {

      this.token = data.access_token;
      this.login({token: this.token});
      load.dismiss();

    }, error => {
      this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
      load.dismiss();
    });
  }

  async login(data: any)
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.inicioSesion({
      username: this.usuario.username,
      password: this.usuario.password,
      access_token: data.token
    }).subscribe((data: any) => {

        let rol_id = data.Data[0].rol_id;
        let username = data.Data[0].usuario;
        
        sessionStorage.username = data.Data[1];
        sessionStorage.sesion_iniciada = data.Data[2];
        sessionStorage.id_usuario = data.Data[3];

        // Si rol es 1 (barbero)
        if(rol_id == 1 || rol_id == "1")
        {
          this.servicio.routeTo('/barberias');
        } else if(rol_id == 2 || rol_id == "2") // Si rol es 2 (cliente)
        {
          this.servicio.routeTo('/clientes');
        } else {
          this.servicio.mensaje("El usuario " + username + " no posee un rol válido", 'danger');
        }

      load.dismiss();
    }, response => {

      let msg = response.error.error.message;
      if(msg == "No autenticado")
      {
        this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
      } else {
        this.servicio.mensaje(msg, 'danger');
      }
      load.dismiss();
    });
  }

  async validarSesion()
  {
      this.servicio.getToken().subscribe((data: any) =>
      {
          this.token = data.access_token;
          let username_sesion = sessionStorage.getItem('username');
          let sesion_iniciada = sessionStorage.getItem('sesion_iniciada');
          let id_user_sesion = sessionStorage.getItem('id_usuario');

          this.validateSession({

            token: this.token,
            sesion_username: username_sesion,
            sesion_iniciada: sesion_iniciada,
            sesion_id_user: id_user_sesion
          });
      }, error => 
      {
          this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
      });
  }

  async validateSession(data: any)
  {
    let load = await this.loading.create();
    load.present();

    this.servicio.validarSesion({
      access_token: data.token,
      sesion_username: data.sesion_username,
      sesion_iniciada: data.sesion_iniciada,
      sesion_id_user: data.sesion_id_user
    }).subscribe((data: any) => 
    {
        load.dismiss();
    }, response => 
    {
        let msg = response.error.error.message;
        this.servicio.mensaje(msg, 'danger');
        this.servicio.routeTo('/inicio-sesion');
        load.dismiss();
    });
  }
}
