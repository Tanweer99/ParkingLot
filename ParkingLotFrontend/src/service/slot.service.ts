import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private _httpClient : HttpClient) { }

  private readonly _baseURL = 'https://localhost:44346';

  CountAvailableSlot() : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/Slot`);
  }

  TotalSlots() : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/Slot/TotalSlots`);
  }

  CreateSlots() : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/Slot/CreateSlot`);
  }

  CheckSlot(slotNumber : any) : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/Slot/CheckSlot/${slotNumber}`);
  }

  DeleteSlot(slotNumber : any) : Observable<any>{
    return this._httpClient.delete(`${this._baseURL}/api/Slot/DeleteSlot/${slotNumber}`);
  }
  
}
