import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { errorInterceptor } from './core/interceptors/error.interceptor';

/**
 * AppModule = módulo raíz de la aplicación.
 *
 * Aquí registramos:
 *   - Animations (requerido por Angular Material)
 *   - HttpClient (con el interceptor global de errores)
 *   - CoreModule (singletons globales)
 *   - LayoutModule (componente que envuelve toda la app)
 *   - AppRoutingModule (rutas + lazy loading de features)
 *
 * Las features (Home, Usuarios, Regiones) NO se importan aquí:
 * se cargan vía lazy loading desde el routing.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    MatSnackBarModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
