import express, { Application, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import cartRouter from './routes/cart';
import ordersRouter from './routes/orders';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:23001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/openapi.json', (req: Request, res: Response) => {
  res.json(swaggerSpec);
});

app.get('/healthcheck', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

export default app;