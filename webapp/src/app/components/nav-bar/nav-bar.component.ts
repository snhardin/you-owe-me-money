import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoggerService } from 'src/app/services/logger.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

/**
 * Component for navigation bar
 */
@Component({
	selector: 'app-nav-bar',
	styleUrls: ['./nav-bar.component.scss'],
	templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit, OnDestroy {
	private _subscription: (Subscription | undefined);

	public email: (string | undefined);
	public isAdmin = false;
	public isLoggedIn = false;

	/**
	 * Constructor for component
	 * @param auth Authentication service
	 * @param logger Logger service
	 */
	constructor (
		public auth: AuthenticationService,
		public logger: LoggerService,
	) { }

	/**
	 * Destroys the component
	 */
	public ngOnDestroy () {
		this._subscription?.unsubscribe();
	}

	/**
	 * Initializes the component
	 */
	public ngOnInit () {
		this.auth.login$.subscribe(value => {
			this.isAdmin = true; // TODO
			this.isLoggedIn = value.loggedIn;
			this.email = value.email;
		});
	}

	/**
	 * Handles click of the logout button
	 */
	public onLogoutClick () {
		this.auth.logout()
			.subscribe(
				() => { /* Do nothing if successful. */ },
				err => {
					this.logger.error('Error while logging out:', err);
				}
			);
	}
}
