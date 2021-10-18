import Container from 'typedi';
import { Connection, ConnectionOptions, createConnection, useContainer } from 'typeorm';
import config from '../config';
import { Admin, Guardian, Seller, Student, User } from '../../features/users';
import { Transaction } from '../../features/transactions';
import { Product } from '../../features/products';
import { Order } from '../../features/orders';
import { OrderItem } from '../../features/order-items';

export const loadTypeOrm = async (): Promise<Connection> => {
  // Set connection options.
  const connectionOptions: ConnectionOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: config.database.type as any,
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: config.database.syncronize,
    logging: config.database.logging,
    entities: [User, Admin, Guardian, Seller, Student, Transaction, Product, Order, OrderItem],
  };

  // Set container.
  useContainer(Container);

  // Create database connection.
  const connection = await createConnection(connectionOptions);

  return connection;
};
