import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

import { SharedModule } from '../../shared/shared.module';
import { RegionesListComponent } from './regiones-list/regiones-list.component';

const routes: Routes = [{ path: '', component: RegionesListComponent }];

@NgModule({
  declarations: [RegionesListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatChipsModule,
  ],
})
export class RegionesModule {}
