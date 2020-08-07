// Adding these types to tsconfig.json doesn't seem to work?
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { Component, AfterViewInit } from '@angular/core';
import { WithEnvironment } from 'src/app/util/mixins';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { skipWhile } from 'rxjs/operators';

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
    this.render();
  }

  private render () {
    this.auth.gapiInitialized$
      .pipe(
        skipWhile(value => !value),
      ).subscribe(() => {
        gapi.signin2.render(this.id, {
          width: 180,
          height: 36,
          longtitle: true,
          theme: 'light',
          onsuccess: (params) => this.onSignIn(params),
        });
      });
  }

  private onSignIn(user: gapi.auth2.GoogleUser) {
    this.auth.handleGoogleAPILogin(user.getAuthResponse());
  }
}
