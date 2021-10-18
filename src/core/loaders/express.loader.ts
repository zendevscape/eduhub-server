import Container from 'typedi';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { useContainer, useExpressServer } from 'routing-controllers';
import { AuthController } from '../../features/auth';
import { UsersController } from '../../features/users';
import { TransactionsController } from '../../features/transactions';
import { ProductsController } from '../../features/products';
import { OrdersController } from '../../features/orders';
import { OrderItemsController } from '../../features/order-items';
import { CommonsController } from '../controllers';
import { ErrorHandler } from '../middlewares';

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
      AuthController,
      UsersController,
      TransactionsController,
      ProductsController,
      OrdersController,
      OrderItemsController,
      CommonsController,
    ],
    middlewares: [ErrorHandler],
  });

  return app;
};
