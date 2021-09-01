import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './catalogs/users/users.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full'},
  {
    path: 'catalogs/users',
    component: UsersComponent,
    canActivate: [AuthGuard], 
    data: {id: 23}
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
