import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion.page';

@Component({
  selector: 'app-barberias',
  templateUrl: './barberias.page.html',
  styleUrls: ['./barberias.page.scss'],
})
export class BarberiasPage implements OnInit {

  public texto = '';
  token: string = '';
  public barberias: string[] = [];

  constructor(
    public servicio: DataService, 
    public loading: LoadingController,
    public inicioSesion: InicioSesionPage) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.inicioSesion.validarSesion();
    this.cargarBarberias();
  }

  async cargarBarberias()
  {
    this.servicio.getToken().subscribe((data: any) =>
     {
        this.token = data.access_token;
        this.obtenerBarberias({token: this.token});
    }, error => 
    {
        this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
    });
  }

  async obtenerBarberias(data: any)
  {
    let load = await this.loading.create();
    load.present();

    this.servicio.cargarBarberias({
      access_token: data.token
    }).subscribe((data: any) => {

      this.barberias = data.Barberia;
      load.dismiss();

    }, response => {

      let msg = response.error.error.message;
      this.servicio.mensaje(msg, 'danger');
      load.dismiss();
    });
  }

  editarBarberia(item: any, ionItemSliding: IonItemSliding)
  {
    ionItemSliding.close();
    this.servicio.routeTo('/edicion-barberias/'+ item.id);
  }
}
