import authController from './controllers/authController';
import balanceController from './controllers/balanceController';
import config from './util/config';
import Koa from 'koa';
import logger from './util/logger';
import mongodb from './db/mongodb';
import Router from '@koa/router';

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

/**
 * Main routine to service.
 */
async function main () {
	try {
		await mongodb.connect(config.DatabaseConnectionString);
		logger.info('Connection to mongodb established');

		const app = new Koa();
		const router = new Router();

		router.use('/auth', authController.routes(), authController.allowedMethods());
		router.use('/balance', balanceController.routes(), balanceController.allowedMethods());

		app.use(router.routes());

		logger.info('Listening on port 8080');
		app.listen(8080);
	} catch (err) {
		logger.error(err);
	}
}

/**
 * Handles stop signal sent to service.
 * @param signal The signal being handled (for logging purposes).
 */
function stop (signal: string) {
	logger.info(`Handling signal ${signal}`);
	mongodb.close()
		.then(() => {
			logger.info('Successfully closed mongo db connection');
		})
		.catch(() => {
			logger.error('Error closing mongo db connection');
		})
		.finally(() => {
			process.exit(0);
		});
}

void main();
