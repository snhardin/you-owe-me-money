import config from '../util/config';
import { findUser } from '../util/database';
import jwt from 'jsonwebtoken';
import Koa from 'koa';
import { JWT_COOKIE_NAME, JwtInfo } from '../util/authentication';

/**
 * Middleware to verify that a user is logged in.
 * @param ctx Koa context
 * @param next Next function for proceeding to next middleware or controller
 */
export async function verify (ctx: Koa.ParameterizedContext, next: Koa.Next) {
	const token = ctx.cookies.get(JWT_COOKIE_NAME);
	if (!token) {
		ctx.throw(401);
	}

	try {
		const t = jwt.verify(token, config.JWTKey) as JwtInfo;
		ctx.email = t.email;
	} catch (err) {
		if (err instanceof jwt.JsonWebTokenError) {
			ctx.throw(401);
		}

		ctx.throw(500);
	}

	const found = await findUser(ctx.email);
	if (!found) {
		ctx.throw(403);
	}

	await next();
}

/**
 * Middleware to refresh JWT.
 * @param ctx Koa context
 * @param next Next function for proceeding to next middleware or controller
 */
export async function refresh (ctx: Koa.ParameterizedContext, next: Koa.Next) {
	await next();

	// Sanity check - this should never happen.
	if (!ctx.email) {
		ctx.throw(500);
	}

	// Create a JWT and return as a cookie.
	const token = jwt.sign({ email: ctx.email }, config.JWTKey, {
		algorithm: 'HS256',
		expiresIn: config.JWTExpiry,
	});

	ctx.cookies.set(JWT_COOKIE_NAME, token, {
		maxAge: config.JWTExpiry * 1000,
		...config.CookieOptions,
	});
}
