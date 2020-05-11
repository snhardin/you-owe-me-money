import Koa from 'koa';
import Router from '@koa/router';

async function testEndpoint (ctx: any) {
    ctx.body = 'Hello World!';
}

function main () {
    const app = new Koa();
    const router = new Router();

    router.get('/', testEndpoint);
    app.use(router.routes());

    console.log('Server listening on port 8888...');
    app.listen(8888);
}

main();
