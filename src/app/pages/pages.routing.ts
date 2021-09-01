import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
      {
        path: 'operations',
        loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule),
        canActivate: [AuthGuard], data: {id : 10}    
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard], data: {id : 18}    
      }
    ]
  }
];
