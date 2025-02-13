import type { FastifyReply, FastifyRequest } from 'fastify';

export const authenticate = (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
  if (!request.session.userId) {
    return reply.status(403).send({ message: 'Unauthorized' });
  }

  done();
};
