import { fastifyCookie } from '@fastify/cookie';
import { fastifySession } from '@fastify/session';

// Extend fastify.session with your custom type.
declare module 'fastify' {
  interface Session {
    userId?: string;
    name?: string;
  }
}
