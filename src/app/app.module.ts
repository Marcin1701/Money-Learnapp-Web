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

@NgModule({
  declarations: [
    AppComponent,

    // Pages
    AppPagesComponent,
    AppPagesHomeComponent,
    AppPagesLoginComponent,
    AppPagesRegisterComponent,
    AppAccountComponent,

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

    // Utils
    AppCommonNothingFoundComponent,
    AppCommonNavbarComponent
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
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
