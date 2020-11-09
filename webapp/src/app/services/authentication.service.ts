// Adding these types to tsconfig.json doesn't seem to work?
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { LoggerService } from './logger.service';
import { Router } from '@angular/router';
import { WithEnvironment } from '../util/mixins';
import { BehaviorSubject, forkJoin, from, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

/**
 * Login state for the application
 */
export interface LoginState {

	/**
	 * Email of the user as recognized by the API
	 */
	email?: string;

	/**
	 * Whether or not the user is logged in
	 */
	loggedIn: boolean;

	/**
	 * Whether or not the API recognizes this user as valid
	 */
	validUser?: boolean;
}

/**
 * Service for handling authentication
 */
@Injectable({
	providedIn: 'root',
})
export class AuthenticationService extends WithEnvironment() {
	private _gapiInitialized: BehaviorSubject<boolean>;
	private _login: BehaviorSubject<LoginState>;
	private _loginState: LoginState;

	private _token: string;

	public gapiInitialized$: Observable<boolean>;
	public login$: Observable<LoginState>;

	/**
	 * Costructor for service
	 * @param http Http client for making requests
	 * @param logger Logger for logging to console
	 * @param ngZone Zone control
	 * @param router Routing service
	 */
	constructor (
		private http: HttpClient,
		private logger: LoggerService,
		private ngZone: NgZone,
		private router: Router,
	) {
		super();

		// Private fields
		this._gapiInitialized = new BehaviorSubject<boolean>(false);
		this._loginState = {
			loggedIn: false,
		};
		this._login = new BehaviorSubject<LoginState>(this._loginState);
		this._token = '';

		// Public fields
		this.gapiInitialized$ = this._gapiInitialized.asObservable();
		this.login$ = this._login.asObservable();

		this.initGapi();
	}

	/**
	 * Get the token associated with the session (if there is one)
	 */
	public get token () {
		return this._token;
	}

	/**
	 * Handles a new login state
	 * Just sets some information internally.
	 * @param loginState The new login state to keep track of
	 */
	private handleNewLoginState (loginState: LoginState) {
		this._loginState = loginState;
		this._login.next(this._loginState);
	}

	/**
	 * Handles when a sign-in change is detected
	 * @param signedIn Whether or not the user is signed in
	 */
	private handleSignInChange (signedIn: boolean) {
		if (!signedIn) {
			// force change detection.
			this.ngZone.run(() => {
				this.logout().subscribe();
			});
		}
	}

	/**
	 * Initialize the Google API
	 */
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
							// force change detection.
							this.ngZone.run(() => {
								this.logout().subscribe();
							});
						}

						// Add sign in state listening.
						api.isSignedIn.listen(this.handleSignInChange.bind(this));
						this._gapiInitialized.next(true);
					},
					err => this.logger.error('Error initializing Gapi:', err),
				);
		});
	}

	/**
	 * Checks if the user is logged in
	 * @returns An observable with the login state
	 */
	public checkLoggedIn (): Observable<LoginState> {
		return this.http.get<LoginState>(`${this.env.api.base}${this.env.api.checkAuth}`)
			.pipe(
				tap(result => {
					this.handleNewLoginState(result);
				}),
			);
	}

	/**
	 * Handles an authentication response from the Google API
	 * Redirects back to the home page.
	 * @param authResponse The response from GAPI
	 */
	public handleGoogleAPILogin (authResponse: gapi.auth2.AuthResponse) {
		this._token = authResponse.id_token;

		const headers = new HttpHeaders({
			Authorization: `Bearer ${this._token}`,
		});

		this.http.get<LoginState>(`${this.env.api.base}${this.env.api.auth}`, { headers })
			.subscribe(result => {
				this.handleNewLoginState(result);
				void this.ngZone.run(() => this.router.navigate(['/']));
			});
	}

	/**
	 * Logs the user out of the application
	 * @returns An observable that completes when the user is logged out
	 */
	public logout () {
		this.handleNewLoginState({ loggedIn: false });

		const apiLogout = this.http.get<void>(`${this.env.api.base}${this.env.api.logoutAuth}`)
			.pipe(
				catchError(err => {
					this.logger.error('Error while logging out:', err);

					return of();
				}),
			);
		const googleLogout = from(gapi.auth2.getAuthInstance()
			.signOut());

		return forkJoin([apiLogout, googleLogout]);
	}
}
