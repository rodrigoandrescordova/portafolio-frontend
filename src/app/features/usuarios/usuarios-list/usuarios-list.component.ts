import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { UsuariosService } from '../../../core/services/usuarios.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss'],
  standalone: false,
})
export class UsuariosListComponent implements OnInit, AfterViewInit {
  loading = true;
  searchTerm = '';
  dataSource = new MatTableDataSource<Usuario>([]);
  displayedColumns = ['rut', 'nombre', 'email', 'ubicacion', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.loadUsuarios();
    this.configureFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsuarios(): void {
    this.usuariosService.findAll().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Configura cómo el dataSource filtra: busca el término en los campos relevantes.
   */
  private configureFilter(): void {
    this.dataSource.filterPredicate = (u: Usuario, filter: string): boolean => {
      const haystack = [
        u.rut,
        u.nombres,
        u.apellidoPaterno,
        u.apellidoMaterno || '',
        u.email,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(filter);
    };
  }
}
