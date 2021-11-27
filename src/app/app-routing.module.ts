import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPagesComponent } from './pages/app-pages.component';
import { AppPagesRegisterComponent } from './pages/register/app-pages-register.component';
import { AppAccountComponent } from './pages/account/app-account.component';
import { AppAccountCreatorComponent } from './pages/account/creator/app-account-creator.component';
import { AppAccountCreatorNewQuestionComponent } from './pages/account/creator/new-question/app-account-creator-new-question.component';
import { AppAccountCreatorNewFormComponent } from './pages/account/creator/new-form/app-account-creator-new-form.component';
import { AppAccountCreatorShowFormsComponent } from './pages/account/creator/show-forms/app-account-creator-show-forms.component';
import { AppAccountCreatorShowQuestionsComponent } from './pages/account/creator/show-questions/app-account-creator-show-questions.component';
import {AppAccountClassComponent} from './pages/account/class/app-account-class.component';
import {AppAccountClassListComponent} from './pages/account/class/list/app-account-class-list.component';
import {AppAccountClassStudentsAddComponent} from './pages/account/class/students/add/app-account-class-students-add.component';
import {AppAccountClassStudentsShowComponent} from './pages/account/class/students/show/app-account-class-students-show.component';

const routes: Routes = [
  {
    path: '',
    component: AppPagesComponent,
  },
  {
    path: 'register',
    component: AppPagesRegisterComponent,
  },
  {
    path: 'account',
    component: AppAccountComponent,
  },
  {
    path: 'creator',
    component: AppAccountCreatorComponent,
    children: [
      {
        path: 'new-form',
        component: AppAccountCreatorNewFormComponent,
      },
      {
        path: 'new-question',
        component: AppAccountCreatorNewQuestionComponent,
      },
      {
        path: 'show-forms',
        component: AppAccountCreatorShowFormsComponent,
      },
      {
        path: 'show-questions',
        component: AppAccountCreatorShowQuestionsComponent,
      },
    ],
  },
  {
    path: 'class',
    component: AppAccountClassComponent,
    children: [
      {
        path: 'show-class',
        component: AppAccountClassListComponent
      },
      {
        path: 'students-show',
        component: AppAccountClassStudentsShowComponent,
      },
      {
        path: 'students-add',
        component: AppAccountClassStudentsAddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
