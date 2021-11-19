import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'

@NgModule({
    imports: [
      MatIconModule,
      MatCardModule,
      MatSelectModule
  
    ],
    exports: [
      MatIconModule,
      MatCardModule,
      MatSelectModule
    ]
  })
  export class MaterialModule { }
  