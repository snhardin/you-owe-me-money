import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Interceptor for catching 401 responses
 */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

	/**
	 * Constructor for interceptor
	 * @param auth Authentication service
	 */
	constructor (
		private auth: AuthenticationService,
	) { }

	/**
	 * Intercepts requests for application
	 * @param request The request intercepted
	 * @param next The next request in the call chain
	 */
	public intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request)
			.pipe(
				catchError(err => {
					if (err instanceof HttpErrorResponse && err.status === 401) {
						return this.auth.logout()
							.pipe(
								map(() => throwError(err)),
							);
					}

					return throwError(err);

				}),
			) as Observable<HttpEvent<unknown>>;
	}
}
