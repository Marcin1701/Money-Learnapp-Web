import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPagesComponent} from './pages/app-pages.component';
import {AppPagesRegisterComponent} from './pages/register/app-pages-register.component';

const routes: Routes = [
  { path: '', component: AppPagesComponent },
  { path: 'register', component: AppPagesRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
