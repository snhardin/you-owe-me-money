import Koa from 'koa';
import { BalanceResponse } from './balanceController.interface';

export async function getBalance (ctx: Koa.ParameterizedContext) {
    const response: BalanceResponse = {
        balance: 5.00,
    };

    ctx.body = response;
}
