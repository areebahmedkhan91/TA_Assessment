import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public getCurrencies(): Observable<any> {
    return this.http.get(this.apiUrl + '/currencies');
  }

  public convertCurrency(base: string, target: string, amount: number): Observable<any> {
    return this.http.post(this.apiUrl + '/convert', { base, target, amount });
  }

  public getHistory(): Observable<any> {
    return this.http.get(this.apiUrl + '/history');
  }
}
