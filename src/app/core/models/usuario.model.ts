import { Comuna } from './comuna.model';
import { Region } from './region.model';

export interface Usuario {
  id: string;
  rut: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  email: string;
  telefono?: string;
  comunaId?: number;
  regionId?: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;

  comuna?: Comuna;
  region?: Region;
}
