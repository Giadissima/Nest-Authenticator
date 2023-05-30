import { MongooseModuleOptions } from "@nestjs/mongoose";

export interface IEnvironment {
  environment: 'production' | 'development';
  appName: string;
  port: number;
  enableSwagger: boolean;
  jwt: JWTConfig;
  mongoose: MongooseModuleOptions;
  userDto: UserDto;
  bcryptSalt: string;
}

export interface JWTConfig {
  secret: string;
  duration: string;
  ignoreExpiration: boolean;
}

export interface UserDto{
  usernameMinLenght: number;
  usernameMaxLenght: number;
  passwordMinLenght: number;
  passwordMaxLenght: number;
}

/* 
  SINTAX EXPLAINING
  ? "as ClassName" creates obj that satisfies that interface, without a real validation,
  ? "nomeObj: <ClassName>" generates an error if nomeObj contains a property that doesn't exists inside ClassName,
  ? "satisfies ClassName" makes a real validation of the object, to make sure it has all properties described in class
*/
export default (): IEnvironment =>
  ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT ?? '3000', 10),
    enableSwagger: process.env.ENABLE_SWAGGER == 'true',
    jwt: <JWTConfig>{
      secret: process.env.JWT_SECRET,
      duration: process.env.JWT_EXPIRES_IN || '7d',
      // TODO chiedere se ignore expiration serve per dare unauthorized nel momento in cui il token scade
      ignoreExpiration: process.env.JWT_IGNORE_EXP == 'true',
    },
    // TODO posso evitare la duplicazione di appName?
    appName: process.env.APP_NAME ??  'Nest-Middlewares-with-Swagger',
    mongoose: <MongooseModuleOptions>{
      appName: process.env.APP_NAME ??  'Nest-Middlewares-with-Swagger',
      authSource: process.env.MONGO_AUTH_SOURCE ?? 'admin',
      autoIndex: Boolean(process.env.MONGO_AUTO_INDEX ?? true),
      maxPoolSize: parseInt(process.env.MONGO_POOL_SIZE ?? '50'),
      serverSelectionTimeoutMS: parseInt(
        process.env.MONGO_SERVER_TIMEOUT ?? '10000',
        ),
        ignoreUndefined: true,
        family: parseInt(process.env.MONGO_IP_FAMILY ?? '4'),
        uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
      },
      userDto: <UserDto>{
        usernameMinLenght: Number(process.env.USER_DTO_USERNAME_MIN_LENGHT ?? 0),
        usernameMaxLenght: Number(process.env.USER_DTO_USERNAME_MAX_LENGHT ?? 500),
        passwordMinLenght: Number(process.env.USER_DTO_PASSWORD_MIN_LENGHT ?? 0),
        passwordMaxLenght: Number(process.env.USER_DTO_PASSWORD_MAX_LENGHT ?? 500),
      },
      bcryptSalt: process.env.BCRYPT_SALT
  } as IEnvironment);
