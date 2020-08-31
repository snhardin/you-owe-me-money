import { AuthenticationService } from '../services/authentication.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

/**
 * Guard that checks if the user is logged in
 */
@Injectable({
	providedIn: 'root',
})
export class NotLoggedInGuard implements CanActivate {
	/**
	 * Constructor for guard
	 * @param auth Authentication service
	 */
	constructor (
		private auth: AuthenticationService,
	) { }

	/**
	 * Indicates to router whether to continue or not
	 * @returns Observable with boolean response
	 */
	public canActivate () {
		return this.auth.login$.pipe(
			map(loginState => !loginState.loggedIn),
		);
	}
}
