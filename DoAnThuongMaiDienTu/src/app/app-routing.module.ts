import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },

  { path: 'user', loadChildren: () => import('./Modules/user-interface/user-interface.module').then(m => m.UserInterfaceModule) },

  { path: 'admin', loadChildren: () => import('./Modules/admin-interface/admin-interface.module').then(m => m.AdminInterfaceModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
