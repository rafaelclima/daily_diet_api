import Fastify from 'fastify';
import knexSetup from './db/database';

const app = Fastify();

app.get('/hello', async (request, reply) => {
  const table = await knexSetup('users').select('*');
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
