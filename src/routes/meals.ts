import type { FastifyInstance } from 'fastify';
import { authenticate } from '../middlewares/check_user_authenticate';
import knexSetup from '../db/database';
import { z } from 'zod';

interface MealRequestParams {
  id: string;
}

interface SummaryResponse {
  totalMeals: number;
  totalMealsOnDiet: number;
  totalMealsOutDiet: number;
  bestSequence: number;
}

export const mealsRoutes = async (app: FastifyInstance) => {
  // Retorna as refeições do usuário logado
  app.get('/', { onRequest: [authenticate] }, async (request, reply) => {
    const userId = z.string().uuid().nonempty().parse(request.session.userId);
    const meals = await knexSetup('meals').where('user_id', userId).select('*');

    reply.status(200).send(meals);
  });

  // Cria uma refeição para o usuário logado
  app.post('/', { onRequest: [authenticate] }, async (request, reply) => {
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
  app.put('/:id', { onRequest: [authenticate] }, async (request, reply) => {
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

  // Deleta uma refeição criada pelo usuário logado
  app.delete('/:id', { onRequest: [authenticate] }, async (request, reply) => {
    const sessionUserId = z.string().uuid().nonempty().parse(request.session.userId);

    const { id } = request.params as MealRequestParams;
    const deletedMeal = await knexSetup('meals')
      .where('id', id)
      .andWhere('user_id', sessionUserId)
      .delete();

    if (deletedMeal) {
      reply.status(200).send({ message: 'Refeição deletada com sucesso!' });
    } else {
      reply.status(404).send({ message: 'Refeição não encontrada ou exclusão não autorizada' });
    }
  });

  // Retorna uma refeição criada pelo usuário logado
  app.get('/:id', { onRequest: [authenticate] }, async (request, reply) => {
    const sessionUserId = z.string().uuid().nonempty().parse(request.session.userId);

    if (!sessionUserId) {
      return reply.status(401).send({ message: 'Usuário não autenticado' });
    }

    const { id } = request.params as MealRequestParams;

    const meal = await knexSetup('meals')
      .where('id', id)
      .andWhere('user_id', sessionUserId)
      .first();

    if (!meal) {
      return reply.status(404).send({ message: 'Refeição não encontrada' });
    }

    reply.status(200).send(meal);
  });

  // Retorna um resumo das refeições criadas pelo usuário
  app.get('/summary', { onRequest: [authenticate] }, async (request, reply) => {
    const sessionUserId = z.string().uuid().nonempty().parse(request.session.userId);

    // Total de refeições registradas
    const { total: totalMeals } = (await knexSetup('meals')
      .where('user_id', sessionUserId)
      .count('* as total')
      .first()) as { total: number };
    // Total de refeições dentro da dieta
    const { total: totalMealsOnDiet } = (await knexSetup('meals')
      .where('user_id', sessionUserId)
      .andWhere('is_on_diet', true)
      .count('* as total')
      .first()) as { total: number };
    // Quantidade total de refeições fora da dieta
    const { total: totalMealsOutDiet } = (await knexSetup('meals')
      .where('user_id', sessionUserId)
      .andWhere('is_on_diet', false)
      .count('* as total')
      .first()) as { total: number };
    // Melhor sequência de refeições dentro da dieta
    const bestSequenceQuery = `
      SELECT
          MAX(sequence_length) AS best_sequence
      FROM (
          SELECT
              COUNT(*) as sequence_length
          FROM (
              SELECT
                  id,
                  user_id,
                  is_on_diet,
                  created_at,
                  SUM(CASE WHEN is_on_diet = 1 AND (prev_is_on_diet = 0 OR prev_is_on_diet IS NULL) THEN 1 ELSE 0 END) OVER (ORDER BY created_at) as sequence_id
              FROM (
                SELECT
                    id,
                    user_id,
                    is_on_diet,
                    created_at,
                    LAG(is_on_diet, 1, 0) OVER (PARTITION BY user_id ORDER BY created_at) as prev_is_on_diet
                FROM meals
                WHERE user_id = ?
              )
              WHERE is_on_diet = 1
          )
          GROUP BY sequence_id
      );
    `;

    const bestSequence = await knexSetup.raw(bestSequenceQuery, [sessionUserId]).then((result) => {
      const results = (result as unknown[])[0] as { best_sequence: number | null };
      return results.best_sequence || 0;
    });

    const response: SummaryResponse = {
      totalMeals,
      totalMealsOnDiet,
      totalMealsOutDiet,
      bestSequence
    };

    reply.status(200).send(response);
  });
};
