import { findBalance } from '../util/database';
import Koa from 'koa';
import Router from '@koa/router';
import { refresh, verify } from '../middleware/authMiddleware';

/**
 * Response from Balance controller.
 */
interface BalanceResponse {

	/**
	 * The balance for the current user.
	 */
	balance: number;
}

/**
 * Default route for the balance controller.
 * @param ctx The Koa context for the request.
 */
async function balance (ctx: Koa.ParameterizedContext) {
	const result = await findBalance(ctx.email);
	if (result) {
		(ctx.body as BalanceResponse) = {
			balance: result.balance,
		};
	} else {
		ctx.throw(404);
	}
}

const router = new Router();
router.get('/', verify, refresh, balance);

export default router;
