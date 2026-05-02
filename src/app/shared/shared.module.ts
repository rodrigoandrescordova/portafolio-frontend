import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoadingComponent } from './components/loading/loading.component';

/**
 * SharedModule: componentes y módulos reutilizables que muchas features necesitan.
 * Cualquier feature module puede importar SharedModule.
 */
@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    // Re-exportamos lo común para que los features no tengan que importarlo de nuevo
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoadingComponent,
  ],
})
export class SharedModule {}
