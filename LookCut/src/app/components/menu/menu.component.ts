import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Componente } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Observable<Componente[]>;
  token: string = '';

  constructor(
    public servicio: DataService, 
    public loading: LoadingController) { }

  ngOnInit() {
    this.componentes = this.servicio.getMenuOpts();
  }

  async logout()
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.getToken().subscribe((data: any) => 
    {
        this.token = data.access_token;
        this.cerrarSesion({token: this.token});
        load.dismiss();
    }, error => 
    {
        this.servicio.mensaje("NO es posible procesar su petición en estos momentos, íntente más tarde", 'danger');
        load.dismiss();
    });
  }

  async cerrarSesion(data: any)
  {
    let load = await this.loading.create();
    load.present();
    this.servicio.logout({
      access_token: data.token
    }).subscribe((data: any) => 
    {
        let msg = data.Data.message;
        this.servicio.mensaje(msg, 'success');
        this.servicio.routeTo('/inicio-sesion');
        load.dismiss();
    }, response => 
    {
        let msg = response.error.error.message;
        this.servicio.mensaje(msg, 'danger');
        load.dismiss();
    });
  }
}
