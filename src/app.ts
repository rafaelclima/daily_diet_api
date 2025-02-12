import 'dotenv/config';

import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import { login } from './routes/login';
import { mealsRoutes } from './routes/meals';
import { usersRoutes } from './routes/users';

if (!process.env.SESSION_SECRET) {
  throw new Error('A variável de ambiente SESSION_SECRET não está definida.');
}

export const app = fastify();

app.register(fastifyCookie);

app.register(fastifySession, {
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
});

app.register(login, { prefix: '/login' });
app.register(mealsRoutes, { prefix: '/' });
app.register(usersRoutes, { prefix: '/users' });
