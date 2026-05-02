import { NgModule, Optional, SkipSelf } from '@angular/core';

/**
 * CoreModule contiene services y providers que deben ser singletons
 * en toda la aplicación. Solo debe ser importado UNA vez en AppModule.
 *
 * Como los services usan `providedIn: 'root'`, este módulo está vacío,
 * pero su existencia documenta la intención y previene su importación múltiple.
 */
@NgModule({
  imports: [],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya fue cargado. Solo importarlo en AppModule.',
      );
    }
  }
}
