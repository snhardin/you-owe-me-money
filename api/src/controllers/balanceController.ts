import Koa from 'koa';
import { findBalance } from '../util/authentication';
import Router from '@koa/router';
import { verify } from '../middleware/authMiddleware';

interface BalanceResponse {
    balance: number;
}

async function balance (ctx: Koa.ParameterizedContext) {
    const result = await findBalance(ctx.email);
    if (result) {
        ctx.body = <BalanceResponse>{
            balance: result.balance,
        };
    } else {
        ctx.throw(404);
    }
}

const router = new Router();
router.get('/', verify, balance);

export default router;
