import crypto from 'crypto';

/**
 * The name of the environment variable containing the Google API client id.
 */
const CLIENT_ID_ENV_NAME = 'CLIENT_ID';

/**
 * The name of the environment variable containing the mongo db connection string.
 */
const CONNECTION_STRING_ENV_NAME = 'MONGO_URL';

/**
 * The name of the environment variable containing the JWT expiration time.
 */
const JWT_EXPIRY_ENV_NAME = 'JWT_EXPIRY';

/**
 * The name of the environment variable containing the JWT key for encryption.
 */
const JWT_KEY_ENV_NAME = 'JWT_KEY';

/**
 * The name of the environment variable indicating whether or not this is a production instance.
 */
const PRODUCTION_NAME = 'PRODUCTION';

/**
 * Class implementation that handles config singleton.
 */
class Configuration {
	private _clientId = '';
	private _dbConnStr = '';
	private _jwtExpiry = 0;
	private _jwtKey = '';
	private _production = false;

	/**
	 * Gets the Google Client ID
	 */
	public get ClientId () {
		return this._clientId;
	}

	/**
	 * Gets the cookie security options to assign to the JWT
	 */
	public get CookieOptions () {
		if (!this._production) {
			return { httpOnly: true };
		}

		return {
			httpOnly: true,
			sameSite: true,
			secure: true,
		};
	}

	/**
	 * Gets the mongo connection string
	 */
	public get DatabaseConnectionString () {
		return this._dbConnStr;
	}

	/**
	 * Gets the JWT expiration time in seconds
	 */
	public get JWTExpiry () {
		return this._jwtExpiry;
	}

	/**
	 * Gets the JWT encryption key
	 */
	public get JWTKey () {
		return this._jwtKey;
	}

	/**
	 * Gets whether or not this is a production instance
	 */
	public get Production () {
		return this._production;
	}

	/**
	 * Constructor for singleton
	 */
	public constructor () {
		this._clientId = process.env[CLIENT_ID_ENV_NAME] || '';
		this._dbConnStr = process.env[CONNECTION_STRING_ENV_NAME] || '';
		this._jwtExpiry = Number(process.env[JWT_EXPIRY_ENV_NAME]);
		this._jwtKey = process.env[JWT_KEY_ENV_NAME] || '';
		this._production = process.env[PRODUCTION_NAME]?.toLowerCase() === 'true';

		if (!this._clientId) {
			throw new Error('Invalid or empty client id');
		}

		if (!this._dbConnStr) {
			throw new Error('Invalid or empty database connection string');
		}

		if (Number.isNaN(this._jwtExpiry)) {
			this._jwtExpiry = 60 * 30;
		}

		if (!this._jwtKey) {
			this._jwtKey = crypto.randomBytes(64).toString('hex');
		}
	}
}

export default new Configuration();
