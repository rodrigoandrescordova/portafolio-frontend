import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comuna } from '../models/comuna.model';

@Injectable({
  providedIn: 'root',
})
export class ComunasService {
  constructor(private readonly api: ApiService) {}

  findAll(regionId?: number): Observable<Comuna[]> {
    const params = regionId ? { regionId } : undefined;
    return this.api.get<Comuna[]>('/comunas', params);
  }

  findOne(id: number): Observable<Comuna> {
    return this.api.get<Comuna>(`/comunas/${id}`);
  }
}
