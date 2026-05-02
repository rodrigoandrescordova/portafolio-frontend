import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root',
})
export class RegionesService {
  constructor(private readonly api: ApiService) {}

  findAll(): Observable<Region[]> {
    return this.api.get<Region[]>('/regiones');
  }

  findOne(id: number): Observable<Region> {
    return this.api.get<Region>(`/regiones/${id}`);
  }
}
