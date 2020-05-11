import merge from 'ts-deepmerge';
import { ENVIRONMENT_DEFAULT } from './environment.default';

export const environment = merge(ENVIRONMENT_DEFAULT, { /* Put development config here */ });
