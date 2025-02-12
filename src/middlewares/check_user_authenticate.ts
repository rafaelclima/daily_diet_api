import type { FastifyReply, FastifyRequest } from 'fastify';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  if (!request.session.userId) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
};
