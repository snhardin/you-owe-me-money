import mongodb from './db/mongodb';
import Koa from 'koa';
import Router from '@koa/router';
import config from './util/config';
import authController from './controllers/authController';
import balanceController from './controllers/balanceController';
import userController from './controllers/userController';

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

async function start () {
    try {
        await mongodb.connect(config.DatabaseConnectionString);

        const app = new Koa();
        const router = new Router();

        router.use('/auth', authController.routes(), authController.allowedMethods());
        router.use('/balance', balanceController.routes(), balanceController.allowedMethods());
        router.use('/user', userController.routes(), userController.allowedMethods());

        app.use(router.routes());

        console.log('Server listening on port 8080...');
        app.listen(8080);
    } catch (err) {
        console.error('index.ts :: main :: Error while initializing:', err);
    }
}

function stop (signal: string) {
    console.error(`index.ts :: main :: Received signal ${signal}`);
    mongodb.close()
        .then(() => {
            console.error('index.ts :: main :: Database closed');
        })
        .catch(() => {
            console.error('index.ts :: main :: Database failed to close. Verify with logs, but it probably was not open');
        });
}

start();
