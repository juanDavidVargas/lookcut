import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Componente } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlAPI: string = 'http://localhost:8000/api/app/';
  private userApi: string = 'api';
  private passwordApi: string = 'api123';
  private secretApi: string = 'Pr81eDF67PLNzoc5HJHe5MU32hQ52080QKqYWD98';

  constructor(
    private http: HttpClient,
    private router: Router,
    public toastCtrl: ToastController) { }

  getMenuOpts(){
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  routeTo(url: string)
  {
    this.router.navigateByUrl(url);
  }

  inicioSesion(data: any)
  {
    return this.http.post(this.urlAPI + 'inicio_sesion', 
                            {username: data.username, password: data.password},
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  logout(data: any)
  {
    // Borramos las variables de la sesion
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('sesion_iniciada');
    sessionStorage.removeItem('id_usuario');

    return this.http.post(this.urlAPI + 'logout', 
                            {},
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  registroBarberias(data: any)
  {
    return this.http.post(this.urlAPI + 'registro_barberias', 
                            {
                              nombre: data.nombre,
                              documento: data.documento,
                              ciudad: data.ciudad,
                              direccion: data.direccion,
                              telefono: data.telefono,
                              correo_electronico: data.correo_electronico,
                              es_barberia: data.es_barberia
                            },
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  registroUsuarios(data: any)
  {
    return this.http.post(this.urlAPI + 'registro', 
                            {
                              nombres: data.nombres,
                              apellidos: data.apellidos,
                              tipo_documento: data.tipo_documento,
                              documento: data.documento,
                              correo: data.correo,
                              rol: data.rol
                            },
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  editarBarberia(data: any)
  {
    return this.http.post(this.urlAPI + 'edicion_barberia', 
                            {
                              id: data.id,
                              nombre: data.nombre,
                              nit: data.documento,
                              ciudad_id: data.ciudad,
                              direccion: data.direccion,
                              telefono: data.telefono,
                              correo: data.correo_electronico,
                              es_barberia: data.es_barberia
                            },
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  cargarCiudades(data: any)
  {
    return this.http.post(this.urlAPI + 'ciudades', 
                            {},
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  cargarBarberias(data: any)
  {
    return this.http.post(this.urlAPI + 'barberias', 
                            {},
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  validarSesion(data: any)
  {
      return this.http.post(this.urlAPI + 'validar_sesion', 
                            {
                              username: data.sesion_username, 
                              sesion_iniciada: data.sesion_iniciada,
                              id_usuario: data.sesion_id_user
                            },
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                        );
  }

  cargarBarberiaPorId(data: any)
  {
    return this.http.post(this.urlAPI + 'barberia_por_id', 
                            {id: data.id},
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  obtenerDocumentos(data: any)
  {
    return this.http.post(this.urlAPI + 'tipos_documento', 
                            {},
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  obtenerRoles(data: any)
  {
    return this.http.post(this.urlAPI + 'roles', 
                            {},
                            {headers: new HttpHeaders({
                              username: this.userApi,
                              password: this.passwordApi,
                              Authorization: 'Bearer ' + data.access_token
                            })}
                          );
  }

  getToken()
  {
    return this.http.post('http://localhost:8000/oauth/token', 
                          {
                            "grant_type": "password",
                            "client_id": 2,
                            "client_secret": this.secretApi,
                            "username": this.userApi,
                            "password": this.passwordApi
                          });
  }

  async mensaje(texto: string, tipo: string = 'success')
  {
    const toast = await this.toastCtrl.create({
      message: texto,
      color: tipo,
      duration: 6000,
      position: 'middle'
    });

    toast.present();
  }

  objectToFormData(obj: any, form?: any, namespace?: any)
  {
    let fd: any = form || new FormData();
    let formKey: any;
    for(let property in obj)
    {
      if(obj.hasOwnProperty(property) && obj[property])
      {
        if(namespace)
        {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }

        if(obj[property] instanceof Date)
        {
          fd.append(formKey, obj[property].toISOString());
        }

        if(typeof obj[property] === 'object' && !(obj[property] instanceof File))
        {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }
}
