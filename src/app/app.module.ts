import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { AppPagesHomeComponent } from './pages/home/app-pages-home.component';
import { AppPagesComponent } from './pages/app-pages.component';
import { AppCommonNavbarComponent } from './common/navbar/app-common-navbar.component';
import { AppPagesLoginComponent } from "./pages/login/app-pages-login.component";


@NgModule({
  declarations: [
    AppComponent,
    AppPagesComponent,
    AppPagesHomeComponent,
    AppCommonNavbarComponent,
    AppPagesLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
