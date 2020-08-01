// Adding these types to tsconfig.json doesn't seem to work?
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _token: string;

  public get token () {
    return this._token;
  }

  public handleGoogleAPILogin (authResponse: gapi.auth2.AuthResponse) {
    this._token = authResponse.id_token;
  }
}
