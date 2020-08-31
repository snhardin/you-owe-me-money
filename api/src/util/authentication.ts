/**
 * Name of the cookie to store the JWT in
 */
export const JWT_COOKIE_NAME = 'youOwe-token';

/**
 * Information encrypted and stored in the JWT
 */
export interface JwtInfo {

	/**
	 * The email of the user
	 */
	email: string;
}
