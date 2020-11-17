import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '@material/material.module';
import { CountProductsPipe } from './pipes/count-products.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CountProductsPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CountProductsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
})
export class SharedModule { }
