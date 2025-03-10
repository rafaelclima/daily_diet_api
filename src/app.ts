import cors from '@fastify/cors';
import { env } from './env';
import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import { login } from './routes/login';
import { logout } from './routes/logout';
import { mealsRoutes } from './routes/meals';
import { usersRoutes } from './routes/users';

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
});

app.register(cors, {
  origin: true
});
app.register(fastifyCookie);

app.register(fastifySession, {
  secret: env.SESSION_SECRET,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
});

app.register(login, { prefix: '/login' });
app.register(mealsRoutes, { prefix: '/' });
app.register(usersRoutes, { prefix: '/users' });
app.register(logout, { prefix: '/logout' });
