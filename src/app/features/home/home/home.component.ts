import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { UsuariosService } from '../../../core/services/usuarios.service';
import { RegionesService } from '../../../core/services/regiones.service';
import { ComunasService } from '../../../core/services/comunas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  loading = true;
  stats = {
    usuarios: 0,
    regiones: 0,
    comunas: 0,
  };

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly regionesService: RegionesService,
    private readonly comunasService: ComunasService,
  ) {}

  ngOnInit(): void {
    // forkJoin ejecuta los 3 requests en paralelo y emite cuando todos terminan
    forkJoin({
      usuarios: this.usuariosService.findAll(),
      regiones: this.regionesService.findAll(),
      comunas: this.comunasService.findAll(),
    }).subscribe({
      next: ({ usuarios, regiones, comunas }) => {
        this.stats = {
          usuarios: usuarios.length,
          regiones: regiones.length,
          comunas: comunas.length,
        };
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
