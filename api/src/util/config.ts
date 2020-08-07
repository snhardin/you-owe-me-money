import crypto from 'crypto';

const CLIENT_ID_ENV_NAME = 'CLIENT_ID';
const CONNECTION_STRING_ENV_NAME = 'MONGO_URL';
const INSECURE_COOKIES_NAME = 'INSECURE_COOKIES';
const JWT_EXPIRY_ENV_NAME = 'JWT_EXPIRY';
const JWT_KEY_ENV_NAME = 'JWT_KEY';

class Configuration {
    private _clientId = '';
    private _dbConnStr = '';
    private _insecureCookies = false;
    private _jwtExpiry = 0;
    private _jwtKey = '';

    public get ClientId () {
        return this._clientId;
    }

    public get CookieOptions () {
        if (this._insecureCookies) {
            return { httpOnly: true };
        } else {
            return {
                httpOnly: true,
                sameSite: true,
                secure: true,
            };
        }
    }

    public get DatabaseConnectionString () {
        return this._dbConnStr;
    }

    public get InsecureCookies () {
        return this._insecureCookies;
    }

    public get JWTExpiry () {
        return this._jwtExpiry;
    }

    public get JWTKey () {
        return this._jwtKey;
    }

    public constructor () {
        this._clientId = process.env[CLIENT_ID_ENV_NAME] || '';
        this._dbConnStr = process.env[CONNECTION_STRING_ENV_NAME] || '';
        this._insecureCookies = Boolean(process.env[INSECURE_COOKIES_NAME]);
        this._jwtExpiry = Number(process.env[JWT_EXPIRY_ENV_NAME]);
        this._jwtKey = process.env[JWT_KEY_ENV_NAME] || '';

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
