// Adding these types to tsconfig.json doesn't seem to work?
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WithEnvironment } from '../util/mixins';
import { BehaviorSubject, Observable, Subject, Subscription, of } from 'rxjs';
import { tap, switchMap, takeUntil, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface LoginState {
  email?: string;
  loggedIn: boolean;
  validUser?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends WithEnvironment() {
  private _login = new BehaviorSubject<LoginState>({
    loggedIn: false,
  });
  private _token: string;

  public login$ = this._login.asObservable();

  constructor (
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) {
    super();
  }

  public get token () {
    return this._token;
  }

  public checkLoggedIn (): Observable<LoginState> {
    return this.http.get<LoginState>(`${this.env.api.base}${this.env.api.checkAuth}`)
      .pipe(
        tap(result => {
          this.handleNewLoginState(result);
        }),
      );
  }

  public handleGoogleAPILogin (authResponse: gapi.auth2.AuthResponse) {
    this._token = authResponse.id_token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._token}`,
    });

    this.http.get<LoginState>(`${this.env.api.base}${this.env.api.auth}`, { headers })
      .subscribe(result => {
        this.handleNewLoginState(result);
        this.ngZone.run(() => this.router.navigate(['/']))
      });
  }

  private handleNewLoginState (loginState: LoginState) {
    this._login.next(loginState);
  }

  public logout () {
    this._login.next({ loggedIn: false });

    return this.http.get<void>(`${this.env.api.base}${this.env.api.logoutAuth}`);
  }
}
