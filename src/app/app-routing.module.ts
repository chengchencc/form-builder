import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ide',
    pathMatch: 'full',
  },
  {
    path: 'ide',
    loadChildren: () =>
      import('./pages/designer/designer.module').then((m) => m.DesignerModule),
  },
  {
    path: 'exception',
    loadChildren: () =>
      import('./pages/exception/exception.module').then(
        (m) => m.ExceptionModule
      ),
  },
  {
    path: '**',
    redirectTo: '/exception/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
