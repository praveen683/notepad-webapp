// CDK
import { A11yModule } from '@angular/cdk/a11y';
// Other
import { NgModule } from '@angular/core';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

const CDK_MODULES = [
  A11yModule,
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
];

@NgModule({
  exports: [...MATERIAL_MODULES, ...CDK_MODULES]
})
export class MaterialModule {}
