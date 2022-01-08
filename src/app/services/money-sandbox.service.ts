import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AccountDetailsResponse,
  AccountResponse,
  AccountRole,
  AnswersRequest,
  AnswersSummary,
  DragAndDropQuestionResponse,
  FormManageResponse,
  FormPublicityResponse,
  FormRequest,
  FormResponse,
  FormToAnswerResponse,
  HomeFormResponse,
  JsonWebTokenResponse,
  LoginRequest,
  MultipleChoiceQuestionResponse,
  NewAccount,
  OrderedListQuestionResponse,
  Question,
  QuestionIdsRequest,
  QuestionPreviewResponse,
  ResultsResponse,
  SingleChoiceQuestionResponse,
} from '../spec/defs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoneySandboxService {
  constructor(private http: HttpClient) {
  }

  validateToken(): Observable<JsonWebTokenResponse> {
    return this.http.get<JsonWebTokenResponse>(environment.apiUrl + '/entry/validate',
      { headers: this.getHeaders() });
  }

  getAccount(): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(environment.apiUrl + '/account',
      { headers: this.getHeaders() });
  }

  updateAccount(account: AccountResponse) {
    return this.http.put(environment.apiUrl + '/account', account, { observe: 'response', headers: this.getHeaders() });
  }

  getAccountRole(): Observable<AccountRole> {
    return this.http.get<AccountRole>(environment.apiUrl + '/account/role', { headers: this.getHeaders() });
  }

  getAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(environment.apiUrl + '/account/all', { headers: this.getHeaders() });
  }

  getAccountDetails(id: string): Observable<AccountDetailsResponse> {
    return this.http.get<AccountDetailsResponse>(environment.apiUrl + '/account/details', {
      params: { id: id },
      headers: this.getHeaders()
    });
  }

  deleteAccount(id: string) {
    return this.http.delete(environment.apiUrl + '/account', {
      params: { id: id },
      headers: this.getHeaders(),
      observe: 'response'
    });
  }

  deleteAccountForms(id: string) {
    return this.http.delete(environment.apiUrl + '/account/forms', {
      params: { id: id },
      headers: this.getHeaders(),
      observe: 'response'
    });
  }

  deleteAccountQuestions(id: string) {
    return this.http.delete(environment.apiUrl + '/account/questions', {
      params: { id: id },
      headers: this.getHeaders(),
      observe: 'response'
    });
  }

  deleteAccountAnswers(id: string) {
    return this.http.delete(environment.apiUrl + '/account/answers', {
      params: { id: id },
      headers: this.getHeaders(),
      observe: 'response'
    });
  }

  login(loginRequest: LoginRequest): Observable<JsonWebTokenResponse> {
    return this.http.post<JsonWebTokenResponse>(
      environment.apiUrl + '/entry/login',
      loginRequest
    );
  }

  register(newUser: NewAccount) {
    return this.http.post(environment.apiUrl + '/entry/new', newUser);
  }

  addQuestion(question: Question): Observable<any> {
    return this.http.post(environment.apiUrl + '/question/new', question,
      {
        observe: 'response',
        headers: this.getHeaders()
      });
  }

  loadSingleChoiceQuestions(): Observable<SingleChoiceQuestionResponse[]> {
    return this.http.get<SingleChoiceQuestionResponse[]>(environment.apiUrl + '/question/single_choice',
      { headers: this.getHeaders() });
  }

  loadMultipleChoiceQuestions(): Observable<MultipleChoiceQuestionResponse[]> {
    return this.http.get<MultipleChoiceQuestionResponse[]>(environment.apiUrl + '/question/multiple_choice',
      { headers: this.getHeaders() });
  }

  loadOrderedListQuestions(): Observable<OrderedListQuestionResponse[]> {
    return this.http.get<OrderedListQuestionResponse[]>(environment.apiUrl + '/question/ordered_list',
      { headers: this.getHeaders() });
  }

  loadDragAndDropQuestions(): Observable<DragAndDropQuestionResponse[]> {
    return this.http.get<DragAndDropQuestionResponse[]>(environment.apiUrl + '/question/drag_and_drop',
      { headers: this.getHeaders() });
  }

  getQuestionsToPreview(questions: QuestionIdsRequest): Observable<QuestionPreviewResponse[]> {
    return this.http.post<QuestionPreviewResponse[]>(environment.apiUrl + '/question/preview', questions,
      { headers: this.getHeaders() });
  }

  getForms(): Observable<FormResponse[]> {
    return this.http.get<FormResponse[]>(environment.apiUrl + '/form', { headers: this.getHeaders() });
  }

  getHomePageListForms(): Observable<HomeFormResponse[]> {
    return this.http.get<HomeFormResponse[]>(environment.apiUrl + '/form/public');
  }

  getFormToAnswerById(id: string): Observable<FormToAnswerResponse> {
    return this.http.get<FormToAnswerResponse>(environment.apiUrl + '/answer/form', { params: { id: id } });
  }

  addAnswers(answers: AnswersRequest): Observable<ResultsResponse> {
    return this.http.post<ResultsResponse>(environment.apiUrl + '/answer/send', answers);
  }

  getAnsweredForms(): Observable<FormResponse[]> {
    return this.http.get<FormResponse[]>(environment.apiUrl + '/form/answers',
      { headers: this.getHeaders() });
  }

  addForm(form: FormRequest) {
    return this.http.post(environment.apiUrl + '/form/add', form, {
      observe: 'response',
      headers: this.getHeaders()
    });
  }

  getManageForms(): Observable<FormManageResponse[]> {
    return this.http.get<FormManageResponse[]>(environment.apiUrl + '/form/manage', { headers: this.getHeaders() });
  }

  getAnswersSummary(): Observable<AnswersSummary> {
    return this.http.get<AnswersSummary>(environment.apiUrl + '/answer/summary', { headers: this.getHeaders() });
  }

  isFormInPublish(id: string): Observable<FormPublicityResponse> {
    return this.http.get<FormPublicityResponse>(environment.apiUrl + '/form/publish/check',
      { params: { id: id }, headers: this.getHeaders() });
  }

  requestPublish(id: string): Observable<FormPublicityResponse> {
    return this.http.get<FormPublicityResponse>(environment.apiUrl + '/form/publish',
      { params: { id: id }, headers: this.getHeaders() });
  }

  adminDeleteForm(id: string) {
    return this.http.delete(environment.apiUrl + '/form/admin', {
      params: { id: id },
      headers: this.getHeaders(),
      observe: 'response'
    });
  }

  getFormsWaitingForPublicity(): Observable<FormResponse[]> {
    return this.http.get<FormResponse[]>(environment.apiUrl + '/form/publish/waiting', { headers: this.getHeaders() });
  }

  publishForm(id: string) {
    return this.http.get(environment.apiUrl + '/form/publish/approve', { params: { id: id }, headers: this.getHeaders() });
  }

  getPdfReport() {
    return this.http.get(environment.apiUrl + '/answer/pdf', { headers: this.getHeaders(), responseType: 'blob' });
  }

  deleteForm(id: string) {
    return this.http.delete(environment.apiUrl + '/form', { observe: 'response', params: { id: id }, headers: this.getHeaders() });
  }

  deleteQuestion(id: string) {
    return this.http.delete(environment.apiUrl + '/question', { observe: 'response', params: { id: id }, headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    // tslint:disable-next-line:no-non-null-assertion
    return new HttpHeaders().set('Authorization', localStorage.getItem('token')!);
  }
}
