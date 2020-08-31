// Adding these types to tsconfig.json doesn't seem to work?
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { AuthenticationService } from 'src/app/services/authentication.service';
import { skipWhile } from 'rxjs/operators';
import { WithEnvironment } from 'src/app/util/mixins';
import { AfterViewInit, Component } from '@angular/core';

/**
 * Component for Google Sign In Button
 */
@Component({
	selector: 'google-sign-in-button',
	template: '<div [id]="id"></div>',
})
export class GoogleSignInButtonComponent extends WithEnvironment() implements AfterViewInit {
	public id = 'g-signin';

	/**
	 * Constructor for component
	 * @param auth Authentication service
	 */
	constructor (
		private auth: AuthenticationService,
	) {
		super();
	}

	/**
	 * Called when the user signs in via the button
	 * @param user The user that has signed in
	 */
	private onSignIn (user: gapi.auth2.GoogleUser) {
		this.auth.handleGoogleAPILogin(user.getAuthResponse());
	}

	/**
	 * This renders the Google Sign-In button. Waits until
	 * the authentication service is ready and initialized.
	 */
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
					onsuccess: params => this.onSignIn(params),
				});
			});
	}

	/**
	 * Runs after the view is initialized
	 */
	public ngAfterViewInit () {
		this.render();
	}
}
