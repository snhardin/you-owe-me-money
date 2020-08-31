import { ENVIRONMENT_DEFAULT } from './environment.default';
import merge from 'ts-deepmerge';

export const environment = merge(ENVIRONMENT_DEFAULT, {
	production: true,
});
