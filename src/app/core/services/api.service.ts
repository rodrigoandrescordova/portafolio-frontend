import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

/**
 * Service base que centraliza la URL de la API y los métodos HTTP comunes.
 * Los services específicos (UsuariosService, RegionesService, etc.) lo usan internamente.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  get<T>(path: string, params?: Record<string, string | number>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }

    return this.http.get<T>(`${this.baseUrl}${path}`, { params: httpParams });
  }

  post<T, B>(path: string, body: B): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  patch<T, B>(path: string, body: B): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }
}
