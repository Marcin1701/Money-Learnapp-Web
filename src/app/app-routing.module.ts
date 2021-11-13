import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppPagesComponent} from './pages/app-pages.component';
import {AppPagesRegisterComponent} from './pages/register/app-pages-register.component';
import {AppAccountComponent} from './pages/account/app-account.component';

const routes: Routes = [
  { path: '', component: AppPagesComponent },
  { path: 'register', component: AppPagesRegisterComponent },
  { path: 'account', component: AppAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
