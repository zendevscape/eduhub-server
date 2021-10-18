import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const { value: env, error } = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION: Joi.number().default(24),
    JWT_REFRESH_TOKEN_EXPIRATION: Joi.number().default(30),
    TYPEORM_TYPE: Joi.string().required(),
    TYPEORM_HOST: Joi.string().required(),
    TYPEORM_PORT: Joi.number().required(),
    TYPEORM_USERNAME: Joi.string().required(),
    TYPEORM_PASSWORD: Joi.string().required(),
    TYPEORM_DATABASE: Joi.string().required(),
    TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
    TYPEORM_LOGGING: Joi.boolean().default(false),
  })
  .unknown(true)
  .validate(process.env);

if (error) {
  throw new Error(`Config validation failed, ${error.message}.`);
}

export default {
  /**
   *  Application port.
   */
  port: env.PORT,
  /**
   * JWT options.
   */
  jwt: {
    /**
     * JWT secret.
     */
    secret: env.JWT_SECRET,
    /**
     * JWT access token expiration in hours.
     */
    accessTokenExpiration: env.JWT_ACCESS_TOKEN_EXPIRATION,
    /**
     * JWT refresh token expiration in days.
     */
    refreshTokenExpiration: env.JWT_REFRESH_TOKEN_EXPIRATION,
  },
  /**
   * Database connection options.
   */
  database: {
    /**
     * Database type.
     */
    type: env.TYPEORM_TYPE,
    /**
     * Database URL.
     */
    url: env.TYPEORM_HOST,
    /**
     * Database host.
     */
    host: env.TYPEORM_HOST,
    /**
     * Database host port.
     */
    port: env.TYPEORM_PORT,
    /**
     * Database username.
     */
    username: env.TYPEORM_USERNAME,
    /**
     * Database password.
     */
    password: env.TYPEORM_PASSWORD,
    /**
     * Database name.
     */
    database: env.TYPEORM_DATABASE,
    /**
     * Database synchronization.
     */
    syncronize: env.TYPEORM_SYNCHRONIZE,
    /**
     * Database logging.
     */
    logging: env.TYPEORM_LOGGING,
  },
};
