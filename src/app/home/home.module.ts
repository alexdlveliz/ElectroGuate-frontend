import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from "./../material/material.module";
import { BannerComponent } from './components/banner/banner.component';
import { Wave1Component } from './components/wave1/wave1.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { SecCategoriasComponent } from './components/sec-categorias/sec-categorias.component';
import { PopularesComponent } from './components/populares/populares.component';
import { MarcasComponent } from './components/marcas/marcas.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    Wave1Component,
    NosotrosComponent,
    SecCategoriasComponent,
    PopularesComponent,
    MarcasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
