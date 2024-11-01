import { Routes } from '@angular/router';
import { RouteNames } from './route-names';

export const routes: Routes = [
  {
    path: RouteNames.home,
    loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
    title: 'Home'
  },
  {
    path: RouteNames.addProduct,
    loadComponent: () => import('./product/components/add-and-update/add-and-update.component'),
    title: 'Add Product'
  },
  {
    path: `${RouteNames.editProduct}/:id`,
    loadComponent: () => import('./product/components/add-and-update/add-and-update.component'),
    title: 'Update Product'
  },
  {
    path: '',
    redirectTo: RouteNames.home,
    pathMatch: 'full'
  }
];
