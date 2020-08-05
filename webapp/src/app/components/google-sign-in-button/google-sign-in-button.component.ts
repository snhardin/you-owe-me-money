// Adding these types to tsconfig.json doesn't seem to work?
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { Component, AfterViewInit } from '@angular/core';
import { WithEnvironment } from 'src/app/util/mixins';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'google-sign-in-button',
  template: '<div [id]="id"></div>'
})
export class GoogleSignInButtonComponent extends WithEnvironment() implements AfterViewInit {
  public id = 'g-signin';

  constructor (
    private auth: AuthenticationService,
  ) {
    super();
  }

  public ngAfterViewInit () {
    this.init();
    this.render();
  }

  private init () {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.env.gapi.clientId,
        fetch_basic_profile: true,
      });
    });
  }

  private render () {
    gapi.signin2.render(this.id, {
      width: 180,
      height: 36,
      longtitle: true,
      theme: 'light',
      onsuccess: (params) => this.onSignIn(params),
    });
  }

  private onSignIn(user: gapi.auth2.GoogleUser) {
    this.auth.handleGoogleAPILogin(user.getAuthResponse());
  }
}
