import Container from 'typedi';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { useContainer, useExpressServer } from 'routing-controllers';
import { OrderController } from '../../features/orders';
import { OrderItemController } from '../../features/order-items';
import { ProductController } from '../../features/products';
import { TransactionController } from '../../features/transactions';
import { UserController } from '../../features/users';
import { ErrorHandler } from '../middlewares/error-handler';

export const loadExpress = (): express.Application => {
  // Create Express app.
  const app = express();

  // Set security HTTP headers
  app.use(helmet());

  // Parse JSON request body
  app.use(express.json());

  // Parse URL encoded request body
  app.use(express.urlencoded({ extended: true }));

  // Enable compression
  app.use(compression());

  // Enable cors
  app.use(cors());

  // Set container.
  useContainer(Container);

  // Configure routing-controller.
  useExpressServer(app, {
    routePrefix: '/api/v1',
    defaultErrorHandler: false,
    classTransformer: false,
    validation: false,
    controllers: [
      OrderController,
      OrderItemController,
      ProductController,
      TransactionController,
      UserController,
    ],
    middlewares: [ErrorHandler],
  });

  return app;
};
