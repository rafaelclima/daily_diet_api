import { development, production } from './Environment';

import knex from 'knex';

const getEnvironment = () => {
  if (process.env.NODE_ENV === 'dev') {
    return development;
  }
  return production;
};

export const Knex = knex(getEnvironment());
