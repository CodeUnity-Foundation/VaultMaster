import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import express, { Application } from 'express';
import { appRouter } from './routes';
import connectToDB from './db';
import { createContext } from './trpc';

const app: Application = express();

connectToDB();

app.use(cors());

app.use('/api', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }));

app.use(express.json());

app.listen(8000, () => {
  console.log('Server listening on port 8000');
});
