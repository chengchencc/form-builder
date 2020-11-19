import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Exception404Component } from './404/exception404.component';

import { ExceptionComponent } from './exception.component';

const routes: Routes = [
  { path: '', component: ExceptionComponent },
  { path: '404', component: Exception404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExceptionRoutingModule {}
