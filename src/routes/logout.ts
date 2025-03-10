import type { FastifyInstance } from 'fastify';

export const logout = (app: FastifyInstance) => {
  app.post('/', async (request, reply) => {
    if (!request.session.userId) {
      return reply.status(400).send({ message: 'User is not logged in' });
    }

    request.session.destroy((err) => {
      if (err) {
        return reply.status(500).send({ message: 'Error logging out' });
      }

      reply.clearCookie('sessionId');
      return reply.status(200).send({ message: 'Logged out successfully' });
    });
  });
};
