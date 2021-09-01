import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard], data: {id : 2}    
      }
    ]
  }
];
