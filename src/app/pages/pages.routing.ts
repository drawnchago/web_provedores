import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
      {
        path: 'admon',
        loadChildren: () => import('./admon/admon.module').then(m => m.AdmonModule),
        canActivate: [AuthGuard], data: {id : 37}    
      },
      {
        path: 'operations',
        loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
        canActivate: [AuthGuard], data: {id : 10}    
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard], data: {id : 18}    
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
        canActivate: [AuthGuard], data: {id : 2}    
      },
      {
        path: 'shopping',
        loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule),
        canActivate: [AuthGuard], data: {id : 6}    
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
        canActivate: [AuthGuard], data: {id : 14}    
      },
    ]
  }
];
