import { CLIENT_ID_NAME, CONNECTION_STRING_NAME, JWT_KEY_NAME, JWT_EXPIRY_NAME } from './constants';
import crypto from 'crypto';

class Configuration {
    private _clientId = '';
    private _dbConnStr = '';
    private _jwtExpiry = 0;
    private _jwtKey = '';

    public get ClientId () {
        return this._clientId;
    }

    public get DatabaseConnectionString () {
        return this._dbConnStr;
    }

    public get JWTExpiry () {
        return this._jwtExpiry;
    }

    public get JWTKey () {
        return this._jwtKey;
    }

    public constructor () {
        this._clientId = process.env[CLIENT_ID_NAME] || '';
        this._dbConnStr = process.env[CONNECTION_STRING_NAME] || '';
        this._jwtExpiry = Number(process.env[JWT_EXPIRY_NAME]);
        this._jwtKey = process.env[JWT_KEY_NAME] || '';
        
        if (!this._clientId) {
            throw new Error('Invalid or empty client id');
        }

        if (!this._dbConnStr) {
            throw new Error('Invalid or empty database connection string');
        }

        if (Number.isNaN(this._jwtExpiry)) {
            this._jwtExpiry = 1800;
        }

        if (!this._jwtKey) {
            this._jwtKey = crypto.randomBytes(64).toString('hex');
        }
    }
}

export default new Configuration();
