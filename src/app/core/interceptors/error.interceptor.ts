import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Interceptor global de errores HTTP.
 * Muestra un snackbar al usuario y propaga el error al observable.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ocurrió un error inesperado';

      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor. ¿La API está corriendo?';
      } else if (error.status === 404) {
        message = 'Recurso no encontrado';
      } else if (error.status === 400) {
        message = 'Datos inválidos';
      } else if (error.status >= 500) {
        message = 'Error en el servidor';
      } else if (error.error?.message) {
        message = error.error.message;
      }

      snackBar.open(message, 'Cerrar', {
        duration: 5000,
        panelClass: ['snackbar-error'],
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });

      return throwError(() => error);
    }),
  );
};
