import { ClientError } from '../core/exception/ClientError';

export const errorHandler = (error: unknown, response: any): unknown => {
  if (error instanceof ClientError) {
    return response.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }
  console.error(error);
  return response.status(500).json({
    status: 'error',
    message: 'Sorry, an error occured on our server',
  });
};
