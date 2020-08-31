import { BalanceServiceResponse } from './balance.service.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WithEnvironment } from '../util/mixins';

/**
 * Service for retrieving balance information from api
 */
@Injectable({
	providedIn: 'root'
})
export class BalanceService extends WithEnvironment() {
	/**
	 * Constructor for service
	 * @param http Http client for making requests
	 */
	constructor (
		private http: HttpClient,
	) {
		super();
	}

	/**
	 * Gets the current user's balance from the api
	 * @returns Observable for response
	 */
	public getBalance () {
		return this.http.get<BalanceServiceResponse>(`${this.env.api.base}${this.env.api.balance}`);
	}
}
