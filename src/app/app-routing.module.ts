import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPagesComponent} from './pages/app-pages.component';

const routes: Routes = [{
  path: '',
  component: AppPagesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
