import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [ MatCheckboxModule, MatIconModule, MatListModule, MatExpansionModule, MatInputModule, MatCardModule, MatButtonModule, MatCardModule, ],
  exports: [ MatCheckboxModule, MatIconModule, MatListModule, MatExpansionModule, MatInputModule, MatCardModule, MatButtonModule, MatCardModule, ]
})

export class MaterialModule { }
