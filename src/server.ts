import Fastify from 'fastify';
import knex from 'knex';

const app = Fastify({
  logger: true
});

app.get('/', async (request, reply) => {
  const table = await knex('sqlite_schema').select('*');
  return table;
});

const start = async () => {
  try {
    await app.listen({ port: 3200 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
