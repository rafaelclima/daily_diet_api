import type { FastifyInstance } from 'fastify';
import knexSetup from '../db/database';
import { z } from 'zod';

export const login = (app: FastifyInstance) => {
  app.post('/', async (request, reply) => {
    const userIdSchema = z.object({
      id: z.string().uuid().nonempty()
    });

    const { id } = userIdSchema.parse(request.body);

    const user = await knexSetup('users').where('id', id).first();

    if (!user) {
      return reply.status(401).send({ message: 'Bad credentials' });
    }

    request.session.userId = user.id;

    reply.send({
      message: 'Logged in successfully'
    });
  });
};
