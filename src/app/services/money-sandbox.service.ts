import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JsonWebTokenResponse, LoginRequest, NewAccount, Question, SingleChoiceQuestionResponse} from '../spec/defs';
import { Observable } from 'rxjs';
import {NonNullAssert} from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class MoneySandboxService {
  constructor(private http: HttpClient) {}

  validateToken(token: string): Observable<JsonWebTokenResponse> {
    return this.http.get<JsonWebTokenResponse>(environment.apiUrl + '/entry/validate',
      {
        headers: new HttpHeaders().set('Authorization', token)
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

  addQuestion(question: Question) {
    return this.http.post(environment.apiUrl + '/question/new', question,
      {
        observe: 'response',
        // tslint:disable-next-line:no-non-null-assertion
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')!)
      });
  }

  loadSingleChoiceQuestions(): Observable<SingleChoiceQuestionResponse[]> {
    return this.http.get<SingleChoiceQuestionResponse[]>(environment.apiUrl + '/question/single_choice',
      {
        // tslint:disable-next-line:no-non-null-assertion
        headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')!)
      });
  }
}
