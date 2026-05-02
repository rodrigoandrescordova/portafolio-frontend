import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { SharedModule } from '../../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { UsuarioDetailComponent } from './usuario-detail/usuario-detail.component';

@NgModule({
  declarations: [UsuariosListComponent, UsuarioDetailComponent],
  imports: [
    SharedModule,
    UsuariosRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
  ],
})
export class UsuariosModule {}
