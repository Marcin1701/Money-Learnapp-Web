import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppPagesHomeComponent } from './pages/home/app-pages-home.component';
import { AppPagesComponent } from './pages/app-pages.component';
import { AppCommonNavbarComponent } from './common/navbar/app-common-navbar.component';
import { AppPagesLoginComponent } from './pages/login/app-pages-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppPagesRegisterComponent } from './pages/register/app-pages-register.component';
import { MatRadioModule } from '@angular/material/radio';
import { AppAccountComponent } from './pages/account/app-account.component';
import { AppAccountCreatorComponent } from './pages/account/creator/app-account-creator.component';
import { AppAccountCreatorNewQuestionComponent } from './pages/account/creator/new-question/app-account-creator-new-question.component';
import { AppAccountCreatorNewFormComponent } from './pages/account/creator/new-form/app-account-creator-new-form.component';
import { AppAccountCreatorShowFormsComponent } from './pages/account/creator/show-forms/app-account-creator-show-forms.component';
import { AppAccountCreatorShowQuestionsComponent } from './pages/account/creator/show-questions/app-account-creator-show-questions.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppCreatorSingleChoiceComponent } from './pages/account/creator/new-question/questions-container/single-choice/app-creator-single-choice.component';
import { AppCreatorMultipleChoiceComponent } from './pages/account/creator/new-question/questions-container/multiple-choice/app-creator-multiple-choice.component';
import { AppCreatorOrderedListComponent } from './pages/account/creator/new-question/questions-container/ordered-list/app-creator-ordered-list.component';
import { AppCreatorDragAndDropComponent } from './pages/account/creator/new-question/questions-container/drag-and-drop/app-creator-drag-and-drop.component';
import { MatIconModule } from '@angular/material/icon';
import { AppCreatorSingleChoiceDialogComponent } from './pages/account/creator/new-question/questions-container/single-choice/dialog/app-creator-single-choice-dialog.component';
import { AppCreatorMultipleChoiceDialogComponent } from './pages/account/creator/new-question/questions-container/multiple-choice/dialog/app-creator-multiple-choice-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {AppShowSingleChoiceComponent} from './pages/account/creator/show-questions/single-choice/app-show-single-choice.component';
import {MatTableModule} from '@angular/material/table';
import {AppCommonNothingFoundComponent} from './common/nothing-found/app-common-nothing-found.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {CustomPaginator} from './common/custom-components/CustomPaginatorConfiguration';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {AppCommonSpinnerComponent} from './common/spinner/app-common-spinner.component';
import {AppPagesAnswerComponent} from './pages/answer/app-pages-answer.component';
import {AppAccountCreatorFormDetailsComponent} from './pages/account/creator/show-forms/form-details/app-account-creator-form-details.component';
import {AppPagesHomeFormListComponent} from './pages/home/form-list/app-pages-home-form-list.component';
import {AppPagesAnswerFormComponent} from './pages/answer/form/app-pages-answer-form.component';
import {AppPagesAnswerFormSingleChoiceComponent} from './pages/answer/form/answers/single-choice-answer/app-pages-answer-form-single-choice.component';
import {AppPagesAnswerFormOrderedListComponent} from './pages/answer/form/answers/ordered-list-answer/app-pages-answer-form-ordered-list.component';
import {AppPagesAnswerFormMultipleChoiceComponent} from './pages/answer/form/answers/multiple-choice-answer/app-pages-answer-form-multiple-choice.component';
import {AppPagesAnswerFormDragAndDropComponent} from './pages/answer/form/answers/drag-and-drop-answer/app-pages-answer-form-drag-and-drop.component';
import {AppPagesAnswerDialogComponent} from './pages/answer/form/answer-dialog/app-pages-answer-dialog.component';
import {AppCommonBigSpinnerComponent} from './common/big-spinner/app-common-big-spinner.component';
import {AppPagesAnswerScoreComponent} from './pages/answer/form/score/app-pages-answer-score.component';
import {RoleService} from './services/role.service';
import {LogoutService} from './services/logout.service';
import {AppPagesAdminUsersComponent} from './pages/admin/users/app-pages-admin-users.component';
import {AppPagesAdminPublicityComponent} from './pages/admin/publicity/app-pages-admin-publicity.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {AppPagesHomeMenuComponent} from './pages/home/menu/app-pages-home-menu.component';
import {AppAccountActivityComponent} from './pages/account/activity/app-account-activity.component';
import {AppAccountActivitySummaryComponent} from './pages/account/activity/summary/app-account-activity-summary.component';
import {AppAccountActivityAnswersComponent} from './pages/account/activity/answers/app-account-activity-answers.component';
import {AppAccountActivityAnswerersComponent} from './pages/account/activity/answerers/app-account-activity-answerers.component';

@NgModule({
  declarations: [
    AppComponent,

    // Core
    AppPagesComponent,
    AppPagesLoginComponent,
    AppPagesRegisterComponent,
    AppAccountComponent,

    // Home
    AppPagesHomeComponent,
    AppPagesHomeFormListComponent,
    AppPagesHomeMenuComponent,

    // Creator
    AppAccountCreatorComponent,
    AppAccountCreatorNewQuestionComponent,
    AppAccountCreatorNewFormComponent,
    AppAccountCreatorShowFormsComponent,
    AppAccountCreatorShowQuestionsComponent,
    AppCreatorSingleChoiceComponent,
    AppCreatorMultipleChoiceComponent,
    AppCreatorOrderedListComponent,
    AppCreatorDragAndDropComponent,
    AppCreatorSingleChoiceDialogComponent,
    AppCreatorMultipleChoiceDialogComponent,
    AppShowSingleChoiceComponent,
    AppAccountCreatorFormDetailsComponent,

    // Activity
    AppAccountActivityComponent,
    AppAccountActivitySummaryComponent,
    AppAccountActivityAnswersComponent,
    AppAccountActivityAnswerersComponent,

    // Answer
    AppPagesAnswerComponent,
    AppPagesAnswerFormComponent,
    AppPagesAnswerFormSingleChoiceComponent,
    AppPagesAnswerFormOrderedListComponent,
    AppPagesAnswerFormMultipleChoiceComponent,
    AppPagesAnswerFormDragAndDropComponent,
    AppPagesAnswerDialogComponent,
    AppPagesAnswerScoreComponent,

    // Admin
    AppPagesAdminUsersComponent,
    AppPagesAdminPublicityComponent,

    // Common
    AppCommonNothingFoundComponent,
    AppCommonNavbarComponent,
    AppCommonSpinnerComponent,
    AppCommonBigSpinnerComponent
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
    FormsModule,
    DragDropModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatTooltipModule,
    ClipboardModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
    RoleService,
    LogoutService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
