import config from '../util/config';
import { findUser } from '../util/database';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import logger from '../util/logger';
import Router from '@koa/router';
import { verify } from '../middleware/authMiddleware';
import { JWT_COOKIE_NAME, JwtInfo } from '../util/authentication';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

/**
 * Google Oauth client
 */
const oauthClient = new OAuth2Client(config.ClientId);

/**
 * Expected token format regex parser
 */
const tokenSearch = /^[Bb]earer +(\S+)$/u;

/**
 * Response for the who handler.
 */
interface WhoAmIResponse {

	/**
	 * Email of the user logged in.
	 */
	email?: string;

	/**
	 * Whether or not the user is logged in.
	 */
	loggedIn: boolean;

	/**
	 * Whether or not the user is a valid user.
	 */
	validUser?: boolean;
}

/**
 * Handler that authenticates a user, generating a session for them.
 * @param ctx Koa context
 */
async function authenticate (ctx: Koa.ParameterizedContext): Promise<void> {
	// Check if the header exists.
	const authHeader: string = ctx.headers?.authorization;
	if (!authHeader) {
		logger.debug('Request is missing authorization header');
		ctx.throw(400);
	}

	// Check if token was passed in the expected format.
	const tokenResult = tokenSearch.exec(authHeader);
	if (!tokenResult || !tokenResult[1]) {
		logger.debug('Request failed to match regex');
		ctx.throw(400);
	}

	// Get information from Google.
	// If an exception is thrown, it's likely due to a bad request.
	let payload: (TokenPayload | undefined);
	try {
		const gResponse = await oauthClient.verifyIdToken({
			audience: config.ClientId,
			idToken: tokenResult[1],
		});

		payload = gResponse.getPayload();
		if (!payload?.email) {
			// No payload? Probably not authorized.
			ctx.throw(401);
		}
	} catch (err) {
		logger.error('GResponse threw an error!', err);
		ctx.throw(400);
	}

	// Create a JWT and return as a cookie.
	const jwtInfo: JwtInfo = {
		email: payload.email,
	};

	const token = jwt.sign(jwtInfo, config.JWTKey, {
		algorithm: 'HS256',
		expiresIn: config.JWTExpiry,
	});

	ctx.cookies.set(JWT_COOKIE_NAME, token, {
		maxAge: config.JWTExpiry * 1000,
		...config.CookieOptions,
	});

	let validUser = false;

	// Look for the user in our database.
	const userLookup = await findUser(payload.email);
	if (userLookup) {
		validUser = true;
	}

	(ctx.body as WhoAmIResponse) = {
		email: payload.email,
		loggedIn: true,
		validUser,
	};
}

/**
 * Handler that expires a user's session.
 * @param ctx Koa context
 */
function logout (ctx: Koa.ParameterizedContext): void {
	// Tell our cookie to expire immediately.
	ctx.cookies.set(JWT_COOKIE_NAME, '', {
		expires: new Date(),
		maxAge: 0,
		...config.CookieOptions,
	});

	ctx.status = 204;
}

/**
 * Handler that identifies a user based on their session.
 * @param ctx Koa context
 */
async function who (ctx: Koa.ParameterizedContext): Promise<void> {
	const token = ctx.cookies.get(JWT_COOKIE_NAME);
	if (!token) {
		(ctx.body as WhoAmIResponse) = {
			loggedIn: false,
		};

		return;
	}

	let verifiedToken: JwtInfo;
	try {
		verifiedToken = jwt.verify(token, config.JWTKey) as JwtInfo;
	} catch (err) {
		if (err instanceof jwt.JsonWebTokenError) {
			(ctx.body as WhoAmIResponse) = {
				loggedIn: false,
			};

			return;
		}

		ctx.throw(500);
	}

	const found = await findUser(verifiedToken.email);
	if (!found) {
		(ctx.body as WhoAmIResponse) = {
			email: verifiedToken.email,
			loggedIn: true,
			validUser: false,
		};

		return;
	}

	(ctx.body as WhoAmIResponse) = {
		email: verifiedToken.email,
		loggedIn: true,
		validUser: true,
	};
}

const router = new Router();
router.get('/', authenticate);
router.get('/logout', verify, logout);
router.get('/whoAmI', who);

export default router;
