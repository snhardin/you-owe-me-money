import { AuthenticationService } from 'src/app/services/authentication.service';
import { BalanceService } from 'src/app/services/balance.service';
import { BalanceServiceResponse } from 'src/app/services/balance.service.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from 'src/app/services/logger.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';

/**
 * Component representing the home page
 */
@Component({
	selector: 'app-home-page',
	styleUrls: ['./home-page.component.scss'],
	templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
	private _subscription: (Subscription | undefined);

	public balance: (number | null);
	public loggedIn = false;

	/**
	 * Constructor for component
	 * @param auth Authentication service
	 * @param balanceService Balance service
	 * @param logger Logger service
	 */
	constructor (
		public auth: AuthenticationService,
		private balanceService: BalanceService,
		private logger: LoggerService,
	) {
		this.balance = null;
	}

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
		this.balance = null;

		this._subscription = this.auth.login$
			.pipe(
				switchMap(loginState => {
					this.loggedIn = loginState.loggedIn;
					if (this.loggedIn) {
						return this.balanceService.getBalance();
					}

					return of<BalanceServiceResponse>({ balance: 0 });

				}),
			)
			.subscribe(response => {
				this.balance = response.balance;
			},
			(err: HttpErrorResponse) => {
				this.balance = null;
				if (err.status === 404) {
					this.logger.error('No balance found for user!');
				} else {
					this.logger.error('Error retrieving balance from API:', err);
				}
			});
	}
}
