import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {
  constructor(
    private geolocation: Geolocation,
    private ctrlLoading: LoadingController
  ) {}

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {

    const loading = await this.ctrlLoading.create();
    loading.present();

    // Acá obtenemos las coordenadas actuales de nuestra posición
    const respuesta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: respuesta.coords.latitude,
      lng: respuesta.coords.longitude,
    };

    // Acá pintamos el mapa en el div con id mapa
    const mapElem: HTMLElement = document.getElementById('mapa');
    const mapa = new google.maps.Map(mapElem, {
      center: myLatLng,
      zoom: 15,
    });

    // Agregamos un loading para indicar que el mapa está cargando
    google.maps.event.addListenerOnce(mapa, 'idle', () => {
      loading.dismiss();

      // Creamos un marcador en nuestra posición
      const marker = new google.maps.Marker({
        position: {
          lat: myLatLng.lat,
          lng: myLatLng.lng
        },
        map: mapa,
        title: 'Mi posición actual'
      })
    });
  }
}
