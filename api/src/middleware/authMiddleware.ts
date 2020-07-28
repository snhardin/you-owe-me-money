import Koa from 'koa';
import { JWT_COOKIE_NAME } from '../util/constants';
import jwt from 'jsonwebtoken';
import config from '../util/config';

export async function verify (ctx: Koa.ParameterizedContext, next: Koa.Next) {
    const token = ctx.cookies.get(JWT_COOKIE_NAME);
    if (!token) {
        ctx.throw(401);
    }

    try {
        ctx.email = jwt.verify(token, config.JWTKey);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            ctx.throw(401);
        }

        ctx.throw(500);
    }

    await next();
}
