import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  AccountResponse, AccountRole, AnswersRequest, FormRequest, FormResponse, FormToAnswerResponse, HomeFormResponse,
  JsonWebTokenResponse,
  LoginRequest,
  NewAccount,
  Question, ResultsResponse,
  SingleChoiceQuestionResponse,
} from '../spec/defs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoneySandboxService {
  constructor(private http: HttpClient) {}

  validateToken(): Observable<JsonWebTokenResponse> {
    return this.http.get<JsonWebTokenResponse>(environment.apiUrl + '/entry/validate',
      {headers: this.getHeaders()});
  }

  getAccount(): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(environment.apiUrl + '/account',
      {headers: this.getHeaders()});
  }

  getAccountRole(): Observable<AccountRole> {
    return this.http.get<AccountRole>(environment.apiUrl + '/account/role', { headers: this.getHeaders() });
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
      {headers: this.getHeaders()});
  }

  getForms(): Observable<FormResponse[]> {
    return this.http.get<FormResponse[]>(environment.apiUrl + '/form', { headers: this.getHeaders() });
  }

  getHomePageListForms(): Observable<HomeFormResponse[]> {
    return this.http.get<HomeFormResponse[]>(environment.apiUrl + '/form/public');
  }

  getFormToAnswerById(id: string): Observable<FormToAnswerResponse> {
    return this.http.get<FormToAnswerResponse>(environment.apiUrl + '/answer/form', { params: { id: id }});
  }

  addAnswers(answers: AnswersRequest): Observable<ResultsResponse> {
    return this.http.post<ResultsResponse>(environment.apiUrl + '/answer/send', answers);
  }

  addForm(form: FormRequest) {
    return this.http.post(environment.apiUrl + '/form/add', form, {
      observe: 'response',
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    // tslint:disable-next-line:no-non-null-assertion
    return new HttpHeaders().set('Authorization', localStorage.getItem('token')!);
  }
}
