import Koa from 'koa';
import { OAuth2Client } from 'google-auth-library';
import config from '../util/config';
import jwt from 'jsonwebtoken';
import { findUser } from '../util/database';
import Router from '@koa/router';
import { verify } from '../middleware/authMiddleware';

export const JWT_COOKIE_NAME = 'youOwe-token';

const oauthClient = new OAuth2Client(config.ClientId);
const tokenSearch = /^[Bb]earer +[a-zA-Z\d]+$/;

async function authenticate (ctx: Koa.ParameterizedContext) {
    const authHeader: string = ctx.headers.authorization;
    if (!authHeader) {
        ctx.throw(400);
    }

    const tokenResult = tokenSearch.exec(authHeader);
    if (!tokenResult || !tokenResult[1]) {
        ctx.throw(400)
    }

    const gResponse = await oauthClient.verifyIdToken({
        idToken: tokenResult[1],
        audience: config.ClientId,
    });

    const payload = gResponse.getPayload();
    if (!payload || !payload.email) {
        ctx.throw(401);
    }

    const userLookup = await findUser(payload.email);
    if (!userLookup) {
        ctx.throw(403);
    }

    const token = jwt.sign({ email: userLookup.email }, config.JWTKey, {
        algorithm: 'HS256',
        expiresIn: config.JWTExpiry,
    });

    ctx.cookies.set(JWT_COOKIE_NAME, token, {
        maxAge: config.JWTExpiry * 1000,
        httpOnly: true,
        // secure: true,
    });

    ctx.status = 204; // No content
}

async function logout (ctx: Koa.ParameterizedContext) {
    ctx.cookies.set(JWT_COOKIE_NAME, '', {
        expires: new Date(),
        maxAge: 0,
        httpOnly: true,
        // secure: true,
    });

    ctx.status = 204;
}

const router = new Router();
router.get('/', authenticate);
router.get('/logout', verify, logout);

export default router;
