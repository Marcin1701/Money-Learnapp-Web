import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  AccountResponse, GeneratedPassword,
  JsonWebTokenResponse,
  LoginRequest,
  NewAccount,
  Question,
  SingleChoiceQuestionResponse,
  StudentRequest, StudentResponse
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
        headers: this.getHeaders()
      });
  }

  loadSingleChoiceQuestions(): Observable<SingleChoiceQuestionResponse[]> {
    return this.http.get<SingleChoiceQuestionResponse[]>(environment.apiUrl + '/question/single_choice',
      {headers: this.getHeaders()});
  }

  addNewStudent(studentRequest: StudentRequest): Observable<GeneratedPassword> {
    return this.http.post<GeneratedPassword>(environment.apiUrl + '/students/new', studentRequest,
      { headers: this.getHeaders() });
  }

  getAllTeacherStudents(): Observable<StudentResponse[]> {
    return this.http.get<StudentResponse[]>(environment.apiUrl + '/students/all', { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    // tslint:disable-next-line:no-non-null-assertion
    return new HttpHeaders().set('Authorization', localStorage.getItem('token')!);
  }
}
