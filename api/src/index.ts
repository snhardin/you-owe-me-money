import Koa from 'koa';
import Router from '@koa/router';
import { getBalance } from './controllers/balanceController';

(function () {
    const app = new Koa();
    const router = new Router();

    router.get('/balance', getBalance);
    app.use(router.routes());

    console.log('Server listening on port 8888...');
    app.listen(8888);
})();
