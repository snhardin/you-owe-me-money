import Koa from 'koa';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import config from '../util/config';
import jwt from 'jsonwebtoken';
import { findUser } from '../util/database';
import Router from '@koa/router';
import { verify } from '../middleware/authMiddleware';
import { JWT_COOKIE_NAME } from '../util/constants';

const oauthClient = new OAuth2Client(config.ClientId);
const tokenSearch = /^[Bb]earer +(\S+)$/;

interface WhoAmIResponse {
    email?: string;
    loggedIn: boolean;
    validUser?: boolean;
}

async function authenticate (ctx: Koa.ParameterizedContext) {
    // Check if the header exists.
    const authHeader: string = ctx.headers.authorization;
    if (!authHeader) {
        ctx.throw(400);
    }

    // Check if token was passed in the expected format.
    const tokenResult = tokenSearch.exec(authHeader);
    if (!tokenResult || !tokenResult[1]) {
        ctx.throw(400);
    }

    // Get information from Google.
    // If an exception is thrown, it's likely due to a bad request.
    let payload: TokenPayload;
    try {
        const gResponse = await oauthClient.verifyIdToken({
            idToken: tokenResult[1],
            audience: config.ClientId,
        });

        payload = gResponse.getPayload() as TokenPayload;
        if (!payload || !payload.email) {
            // No payload? Probably not authorized.
            ctx.throw(401);
        }
    } catch (err) {
        ctx.throw(400);
    }

    // Create a JWT and return as a cookie.
    const token = jwt.sign({ email: payload.email }, config.JWTKey, {
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

    ctx.body = {
        email: payload.email,
        loggedIn: true,
        validUser,
    } as WhoAmIResponse;
}

function logout (ctx: Koa.ParameterizedContext) {
    // Tell our cookie to expire immediately.
    ctx.cookies.set(JWT_COOKIE_NAME, '', {
        expires: new Date(),
        maxAge: 0,
        ...config.CookieOptions,
    });

    ctx.status = 204;
}

async function who (ctx: Koa.ParameterizedContext) {
    const token = ctx.cookies.get(JWT_COOKIE_NAME);
    if (!token) {
        ctx.body = {
            loggedIn: false,
        } as WhoAmIResponse;
        return;
    }

    let verifiedToken: any;
    try {
        verifiedToken = jwt.verify(token, config.JWTKey);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            ctx.body = {
                loggedIn: false,
            } as WhoAmIResponse;
            return;
        }

        ctx.throw(500);
    }

    const found = await findUser(verifiedToken.email);
    if (!found) {
        ctx.body = {
            email: verifiedToken.email,
            loggedIn: true,
            validUser: false,
        } as WhoAmIResponse;
        return;
    }

    ctx.body = {
        email: verifiedToken.email,
        loggedIn: true,
        validUser: true,
    } as WhoAmIResponse;
}

const router = new Router();
router.get('/', authenticate);
router.get('/logout', verify, logout);
router.get('/whoAmI', who);

export default router;
