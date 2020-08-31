import { environment } from 'src/environments/environment';

/**
 * Mixin Constructor type
 */
type Constructor<T> = new(...args: any[]) => T;

/**
 * Mixing that attaches the environment file to the given class.
 * @param Base The class to transform.
 * @returns New class with environment transformation.
 */
export function WithEnvironment<T extends Constructor<{ }>> (Base: T = (class { } as any)) {
	return class extends Base {
		public env: typeof environment;

		/**
		 * Constructor for environment mixin
		 * @param args Any arguments to the constructor
		 */
		constructor (...args: any[]) {
			super(...args);

			this.env = environment;
		}
	};
}
