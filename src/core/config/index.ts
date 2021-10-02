import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // Throw generic error
  throw new Error("Couldn't find .env file");
}

export default {
  /**
   *  Application port.
   */
  port: process.env.PORT,
  /**
   * JWT secret.
   */
  jwtSecret: process.env.JWT_SECRET,
  /**
   * Database connection options.
   */
  database: {
    /**
     * Database type.
     */
    type: process.env.TYPEORM_TYPE,
    /**
     * Database URL.
     */
    url: process.env.TYPEORM_HOST,
    /**
     * Database host.
     */
    host: process.env.TYPEORM_HOST,
    /**
     * Database host port.
     */
    port: Number.parseInt(process.env.TYPEORM_PORT ?? '3306'),
    /**
     * Database username.
     */
    username: process.env.TYPEORM_USERNAME,
    /**
     * Database password.
     */
    password: process.env.TYPEORM_PASSWORD,
    /**
     * Database name.
     */
    database: process.env.TYPEORM_DATABASE,
    /**
     * Database synchronization.
     */
    syncronize: process.env.TYPEORM_SYNCHRONIZE === 'true' ?? false,
    /**
     * Database logging.
     */
    logging: process.env.TYPEORM_LOGGING === 'true' ?? false,
  },
};
