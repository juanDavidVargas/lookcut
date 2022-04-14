import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'pagina-inicial',
    loadChildren: () => import('./pages/pagina-inicial/pagina-inicial.module').then( m => m.PaginaInicialPageModule)
  },
  {
    path: 'registro-barberias',
    loadChildren: () => import('./pages/registro-barberias/registro-barberias.module').then( m => m.RegistroBarberiasPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro-clientes',
    loadChildren: () => import('./pages/registro-clientes/registro-clientes.module').then( m => m.RegistroClientesPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./pages/geolocalizacion/geolocalizacion.module').then( m => m.GeolocalizacionPageModule)
  },
  {
    path: 'barberias',
    loadChildren: () => import('./pages/barberias/barberias.module').then( m => m.BarberiasPageModule)
  },
  {
    path: 'edicion-barberias/:barberiaId',
    loadChildren: () => import('./pages/edicion-barberias/edicion-barberias.module').then( m => m.EdicionBarberiasPageModule)
  },
  {
    path: 'barberos',
    loadChildren: () => import('./pages/barberos/barberos.module').then( m => m.BarberosPageModule)
  },
  {
    path: 'turnos',
    loadChildren: () => import('./pages/turnos/turnos.module').then( m => m.TurnosPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
