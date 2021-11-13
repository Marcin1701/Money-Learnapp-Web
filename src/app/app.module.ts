import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { AppPagesHomeComponent } from './pages/home/app-pages-home.component';
import { AppPagesComponent } from './pages/app-pages.component';
import { AppCommonNavbarComponent } from './common/navbar/app-common-navbar.component';
import { AppPagesLoginComponent } from './pages/login/app-pages-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppPagesRegisterComponent} from './pages/register/app-pages-register.component';
import {MatRadioModule} from '@angular/material/radio';
import {AppAccountComponent} from './pages/account/app-account.component';


@NgModule({
  declarations: [
    AppComponent,
    AppPagesComponent,
    AppPagesHomeComponent,
    AppCommonNavbarComponent,
    AppPagesLoginComponent,
    AppPagesRegisterComponent,
    AppAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
