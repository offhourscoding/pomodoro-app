import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [ MatInputModule, MatCardModule, MatButtonModule, MatCardModule, ],
  exports: [ MatInputModule, MatCardModule, MatButtonModule, MatCardModule, ]
})

export class MaterialModule { }
