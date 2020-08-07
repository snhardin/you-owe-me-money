// Adding these types to tsconfig.json doesn't seem to work?
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WithEnvironment } from '../util/mixins';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface LoginState {
  email?: string;
  loggedIn: boolean;
  validUser?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends WithEnvironment() {
  private _gapiInitialized = new BehaviorSubject<boolean>(false);
  private _loginState = {
    loggedIn: false,
  };
  private _login = new BehaviorSubject<LoginState>(this._loginState);
  private _token: string;

  public gapiInitialized$ = this._gapiInitialized.asObservable();
  public login$ = this._login.asObservable();

  constructor (
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) {
    super();

    this.initGapi();
  }

  public get token () {
    return this._token;
  }

  private initGapi () {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.env.gapi.clientId,
        fetch_basic_profile: true,
      })
      .then(
        api => {
          // Get initial Google Sign-In state
          // If logged out of Google, log us out of the application
          if (!api.isSignedIn.get() && this._loginState.loggedIn) {
            console.log('automatic sign out');
            // force change detection.
            this.ngZone.run(() => {
              this.logout().subscribe();
            });
          }

          // Add sign in state listening.
          api.isSignedIn.listen(this.handleSignInChange.bind(this));
          this._gapiInitialized.next(true);
        },
        err => console.error('Error initializing Gapi:', err),
      );
    });
  }

  private handleSignInChange (signedIn: boolean) {
    if (!signedIn) {
      console.warn('Handled a log out.');
      // force change detection.
      this.ngZone.run(() => {
        this.logout().subscribe();
      });
    }
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
    this._loginState = loginState;
    this._login.next(this._loginState);
  }

  public logout () {
    this.handleNewLoginState({ loggedIn: false });

    return this.http.get<void>(`${this.env.api.base}${this.env.api.logoutAuth}`)
      .pipe(
        catchError(err => {
          console.error('Error while logging out:', err);

          return of();
        }),
      );
  }
}
