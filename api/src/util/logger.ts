import bunyan from 'bunyan';
import config from './config';

let callSource = true;
let standardLogLevel: ('trace' | 'info') = 'trace';
if (config.Production) {
	callSource = false; // this is slow in production
	standardLogLevel = 'info';
}

export default bunyan.createLogger({
	name: 'you-owe-me-money',
	src: callSource,
	streams: [
		{
			level: standardLogLevel,
			stream: process.stdout,
		},
		{
			level: 'error',
			stream: process.stderr,
		},
	],
});
