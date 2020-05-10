import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WithEnvironment } from '../util/mixins';

@Injectable({
  providedIn: 'root'
})
export class BalanceService extends WithEnvironment() {
  constructor (
    private http: HttpClient,
  ) {
    super();
  }
}
