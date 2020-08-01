import Koa from 'koa';
import Router from '@koa/router';
import { findUser } from '../util/database';
import { verify } from '../middleware/authMiddleware';

async function user (ctx: Koa.ParameterizedContext) {
    const user = await findUser(ctx.email);
    if (!user) {
        ctx.throw(500);
    }

    ctx.body = user;
}

const router = new Router();
router.get('/', verify, user);

export default router;
