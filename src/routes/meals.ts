import type { FastifyInstance } from 'fastify';
import { authenticate } from '../middlewares/check_user_authenticate';
import knexSetup from '../db/database';
import { z } from 'zod';

interface MealRequestParams {
  id: string;
}

export const mealsRoutes = async (app: FastifyInstance) => {
  // Retorna as refeições do usuário logado
  app.get('/', { preHandler: [authenticate] }, async (request, reply) => {
    const userId = z.string().uuid().nonempty().parse(request.session.userId);
    const meals = await knexSetup('meals').where('user_id', userId).select('*');

    reply.status(200).send(meals);
  });

  // Cria uma refeição para o usuário logado
  app.post('/', { preHandler: [authenticate] }, async (request, reply) => {
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

  // Atualiza uma refeição criada pelo usuário logado
  app.put('/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const sessionUserId = z.string().uuid().nonempty().parse(request.session.userId);

    const updateMealSchema = z.object({
      description: z.string().optional(),
      snack: z.string().optional(),
      is_on_diet: z.boolean().optional()
    });
    const { description, snack, is_on_diet } = updateMealSchema.parse(request.body);

    const { id } = request.params as MealRequestParams;
    const updatedMeal = await knexSetup('meals')
      .where('id', id)
      .andWhere('user_id', sessionUserId)
      .update({
        description,
        snack,
        is_on_diet,
        updated_at: new Date()
      });

    if (updatedMeal) {
      reply.status(200).send({ message: 'Refeição atualizada com sucesso!' });
    } else {
      reply.status(404).send({ message: 'Refeição não encontrada ou não autorizada' });
    }
  });
};
