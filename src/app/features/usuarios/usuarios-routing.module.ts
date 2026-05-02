import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

const routes: Routes = [
  { path: '', component: UsuariosListComponent },
  { path: ':id', component: UsuarioDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
