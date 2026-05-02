import { Region } from './region.model';

export interface Comuna {
  id: number;
  nombre: string;
  regionId: number;
  region?: Region;
}
