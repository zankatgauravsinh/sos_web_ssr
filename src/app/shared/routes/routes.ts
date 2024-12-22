import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guard/auth.guard';
import { Error404Component } from '../../components/page/error404/error404.component';

export const content: Routes = [
  {
    path: '',
    loadChildren: () => import('../../components/home/home.routes').then(m => m.home)
  },

  {
    path: '',
    loadChildren: () => import('../../components/page/page.routes').then(m => m.page)
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Error404Component
  }
];
