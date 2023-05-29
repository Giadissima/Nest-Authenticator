import { MongooseModuleOptions } from "@nestjs/mongoose";

export interface IEnvironment {
  environment: 'production' | 'development';
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


export default (): IEnvironment =>
  ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT ?? '3000', 10),
    enableSwagger: process.env.ENABLE_SWAGGER == 'true',
    /* 
    SINTAX EXPLAINING
    ? "as ClassName" creates obj that satisfies that interface, without a real validation,
    ? "nomeObj: <ClassName>" generates an error if nomeObj contains a property that doesn't exists inside ClassName,
    ? "satisfies ClassName" makes a real validation of the object, to make sure it has all and only properties described in class
  */
    jwt: {
      secret: process.env.JWT_SECRET,
      duration: process.env.JWT_EXPIRES_IN || '7d',
      ignoreExpiration: process.env.JWT_IGNORE_EXP == 'true',
    } satisfies JWTConfig,
    mongoose: <MongooseModuleOptions>{
      appname: process.env.MONGO_APP_NAME ?? 'Nest-Middlewares-with-Swagger',
      authSource: process.env.MONGO_AUTH_SOURCE ?? 'admin',
      useNewUrlParser: Boolean(process.env.MONGO_USE_URL_PARSER ?? true),
      useUnifiedTopology: Boolean(process.env.MONGO_UNIFIED_TOPOLOGY ?? true),
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
