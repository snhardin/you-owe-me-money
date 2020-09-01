import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { WithEnvironment } from '../util/mixins';

/**
 * Service for managing logging
 */
@Injectable({
	providedIn: 'root',
})
export class LoggerService extends WithEnvironment() {
	/**
	 * Constructor for service
	 */
	constructor () {
		super();

		if (environment.production) {
			log.setLevel('INFO');
		} else {
			log.setLevel('TRACE');
		}
	}

	/**
	 * Logs a debug message to the console
	 * @param msg The message to log
	 */
	public debug (...msg: unknown[]) {
		log.debug(...msg);
	}

	/**
	 * Logs an error message to the console
	 * @param msg The message to log
	 */
	public error (...msg: unknown[]) {
		log.error(...msg);
	}

	/**
	 * Logs an informational message to the console
	 * @param msg The message to log
	 */
	public info (...msg: unknown[]) {
		log.info(...msg);
	}

	/**
	 * Logs a trace message to the console
	 * @param msg The message to log
	 */
	public trace (...msg: unknown[]) {
		log.trace(...msg);
	}

	/**
	 * Logs a warning message to the console
	 * @param msg The message to log
	 */
	public warn (...msg: unknown[]) {
		log.warn(...msg);
	}
}
