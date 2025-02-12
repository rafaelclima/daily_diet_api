import type { FastifyInstance } from 'fastify';
import { authenticate } from '../middlewares/check_user_authenticate';
import knexSetup from '../db/database';
import { z } from 'zod';

export const mealsRoutes = async (app: FastifyInstance) => {
  app.get('/', { preHandler: [authenticate] }, async (request, reply) => {
    const userId = z.string().uuid().nonempty().parse(request.session.userId);
    const meals = await knexSetup('meals').where('user_id', userId).select('*');

    reply.status(200).send(meals);
  });

  app.post('/', { preHandler: [authenticate] }, async (request, reply) => {
    console.log('Body recebido', request.body);

    const userId = z.string().uuid().nonempty().parse(request.session.userId);

    const createMealSchema = z.object({
      description: z.string(),
      snack: z.string().nonempty(),
      is_on_diet: z.boolean()
    });

    const { description, snack, is_on_diet } = createMealSchema.parse(request.body);

    await knexSetup('meals').insert({
      id: crypto.randomUUID(),
      user_id: userId,
      description,
      snack,
      is_on_diet,
      created_at: new Date()
    });

    reply.status(201).send({ message: 'Refeição criada com sucesso!' });
  });
};
