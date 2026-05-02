import { Component, OnInit } from '@angular/core';

import { RegionesService } from '../../../core/services/regiones.service';
import { ComunasService } from '../../../core/services/comunas.service';
import { Region } from '../../../core/models/region.model';
import { Comuna } from '../../../core/models/comuna.model';

@Component({
  selector: 'app-regiones-list',
  templateUrl: './regiones-list.component.html',
  styleUrls: ['./regiones-list.component.scss'],
  standalone: false,
})
export class RegionesListComponent implements OnInit {
  loading = true;
  regiones: Region[] = [];

  // Cache de comunas por región (lazy loading al expandir)
  comunasPorRegion: Record<number, Comuna[]> = {};
  loadingComunas: Record<number, boolean> = {};

  constructor(
    private readonly regionesService: RegionesService,
    private readonly comunasService: ComunasService,
  ) {}

  ngOnInit(): void {
    this.regionesService.findAll().subscribe({
      next: (regiones) => {
        this.regiones = regiones;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Lazy load: cargar comunas solo cuando el usuario abre el panel.
   * Cachear el resultado para no volver a pedirlo.
   */
  onPanelOpened(regionId: number): void {
    if (this.comunasPorRegion[regionId] !== undefined) {
      return; // ya está cargado
    }

    this.loadingComunas[regionId] = true;
    this.comunasService.findAll(regionId).subscribe({
      next: (comunas) => {
        this.comunasPorRegion[regionId] = comunas;
        this.loadingComunas[regionId] = false;
      },
      error: () => {
        this.comunasPorRegion[regionId] = [];
        this.loadingComunas[regionId] = false;
      },
    });
  }
}
