import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppPagesComponent} from './pages/app-pages.component';
import {AppPagesRegisterComponent} from './pages/register/app-pages-register.component';
import {AppAccountComponent} from './pages/account/app-account.component';
import {AppAccountCreatorComponent} from './pages/account/creator/app-account-creator.component';
import {AppAccountCreatorNewQuestionComponent} from './pages/account/creator/new-question/app-account-creator-new-question.component';
import {AppAccountCreatorNewFormComponent} from './pages/account/creator/new-form/app-account-creator-new-form.component';
import {AppAccountCreatorShowFormsComponent} from './pages/account/creator/show-forms/app-account-creator-show-forms.component';
import {AppAccountCreatorShowQuestionsComponent} from './pages/account/creator/show-questions/app-account-creator-show-questions.component';
import {AppPagesAnswerComponent} from './pages/answer/app-pages-answer.component';
import {AppPagesLoginComponent} from './pages/login/app-pages-login.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {AppPagesAdminUsersComponent} from './pages/admin/users/app-pages-admin-users.component';
import {AuthAdminGuardService} from './services/auth-admin-guard.service';
import {AppPagesAdminPublicityComponent} from './pages/admin/publicity/app-pages-admin-publicity.component';
import {AppAccountActivityComponent} from './pages/account/activity/app-account-activity.component';
import {AppAccountActivitySummaryComponent} from './pages/account/activity/summary/app-account-activity-summary.component';
import {AppAccountActivityAnswersComponent} from './pages/account/activity/answers/app-account-activity-answers.component';
import {AppAccountActivityAnswerersComponent} from './pages/account/activity/answerers/app-account-activity-answerers.component';

const routes: Routes = [
  {
    path: '',
    component: AppPagesComponent,
  },
  {
    path: 'login',
    component: AppPagesLoginComponent,
  },
  {
    path: 'register',
    component: AppPagesRegisterComponent,
  },
  {
    path: 'account',
    component: AppAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'creator',
    component: AppAccountCreatorComponent,
    canActivate: [AuthGuard],
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
    path: 'activity',
    component: AppAccountActivityComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'summary',
        component: AppAccountActivitySummaryComponent,
      },
      {
        path: 'answers',
        component: AppAccountActivityAnswersComponent,
      },
      {
        path: 'answerers',
        component: AppAccountActivityAnswerersComponent,
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthAdminGuardService],
    children: [
      {
        path: 'users',
        component: AppPagesAdminUsersComponent,
      },
      {
        path: 'publicity',
        component: AppPagesAdminPublicityComponent,
      }
    ]
  },
  {
    path: 'answer',
    component: AppPagesAnswerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
