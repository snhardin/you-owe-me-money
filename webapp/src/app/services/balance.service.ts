import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WithEnvironment } from '../util/mixins';
import { BalanceServiceResponse } from './balance.service.interface';

@Injectable({
  providedIn: 'root'
})
export class BalanceService extends WithEnvironment() {
  constructor (
    private http: HttpClient,
  ) {
    super();
  }

  public getBalance () {
    return this.http.get<BalanceServiceResponse>(`${this.env.api}/balance`);
  }
}
