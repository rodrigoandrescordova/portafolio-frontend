import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Rutas raíz de la aplicación.
 * Cada feature se carga con lazy loading: Angular descarga el código
 * del módulo solo cuando el usuario navega a esa ruta.
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./features/usuarios/usuarios.module').then(
        (m) => m.UsuariosModule,
      ),
  },
  {
    path: 'regiones',
    loadChildren: () =>
      import('./features/regiones/regiones.module').then(
        (m) => m.RegionesModule,
      ),
  },
  // Cualquier ruta no encontrada redirige al inicio
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
