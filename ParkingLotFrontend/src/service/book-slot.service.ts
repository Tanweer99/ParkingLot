import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookSlotService {

  constructor(private _httpClient : HttpClient) { }

  private readonly _baseURL = 'https://localhost:44346';

  GetSlots(){
    return this._httpClient.get(`${this._baseURL}/api/BookSlot`);
  }

  AddSlot(bookSlot:any,email:any) : Observable<any>{
    return this._httpClient.post(`${this._baseURL}/api/BookSlot/AddSlot/${email}`, bookSlot);
  }

  GetUserSlot(slotNumber : any) : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/BookSlot/GetUserSlot/${slotNumber}`)
  }

  UpdateUserBookedSlot(id:any, bookSlot:any,email:any) : Observable<any>{
    return this._httpClient.put(`${this._baseURL}/api/BookSlot/UpdateUserBookedSlot/${id}/${email}`, bookSlot);
  }

  DeleteSlot(id:any) : Observable<any>{
    return this._httpClient.delete(`${this._baseURL}/api/BookSlot/DeleteSlot/${id}`);
  }

  Authentication(name:any, vehicleNumber:any) : Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/BookSlot/Authentication/${name}/${vehicleNumber}`)
  }
   
  BookedSlotsList(): Observable<any>{
    return this._httpClient.get(`${this._baseURL}/api/BookSlot/BookedSlotsList`)
  }

}
