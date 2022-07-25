import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private _httpClient : HttpClient) { }

  private readonly _baseURL = 'https://localhost:44346';

  CountAvailableSlot()  : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/Slot`);
  }
}
