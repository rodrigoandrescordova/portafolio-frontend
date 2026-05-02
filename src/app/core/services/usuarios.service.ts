import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private readonly api: ApiService) {}

  findAll(): Observable<Usuario[]> {
    return this.api.get<Usuario[]>('/usuarios');
  }

  findOne(id: string): Observable<Usuario> {
    return this.api.get<Usuario>(`/usuarios/${id}`);
  }
}
