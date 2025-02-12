import type { FastifyInstance } from 'fastify';
import knexSetup from '../db/database';
import { z } from 'zod';

export const usersRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    const users = await knexSetup('users').select('*');
    reply.status(200).send({ users });
  });

  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string().min(2)
    });

    const { name } = createUserSchema.parse(request.body);

    await knexSetup('users').insert({
      id: crypto.randomUUID(),
      name
    });

    reply.status(201).send({
      message: 'User created successfully'
    });
  });
};
