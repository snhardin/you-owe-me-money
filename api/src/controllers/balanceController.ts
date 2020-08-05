import Koa from 'koa';
import { findBalance } from '../util/database';
import Router from '@koa/router';
import { verify, refresh } from '../middleware/authMiddleware';

interface BalanceResponse {
    balance: number;
}

async function balance (ctx: Koa.ParameterizedContext) {
    const result = await findBalance(ctx.email);
    if (result) {
        ctx.body = {
            balance: result.balance,
        } as BalanceResponse;
    } else {
        ctx.throw(404);
    }
}

const router = new Router();
router.get('/', verify, refresh, balance);

export default router;
