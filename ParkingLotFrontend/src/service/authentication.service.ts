import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _httpClient : HttpClient) { }
  private readonly _baseURL = 'https://localhost:44346';

  UserSignUp(userDetails:any) : Observable<any>{
    return this._httpClient.post(`${this._baseURL}/api/Authentication`,userDetails);
  }
  Authentication(email:any, password:any) : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/Authentication/Login${email}/${password}`)
  }
}
