import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './layout/layout.component';

const homeModuleRoute = () => import('./home/home.module').then(m => m.HomeModule);

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: homeModuleRoute
      },
      {
        path: 'contact',
        component: ContactComponent
      },
    ]
  },
  {
    path: '**',
    loadChildren: homeModuleRoute
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
