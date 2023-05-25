export interface IEnvironment {
  environment: 'production' | 'development';
  port: number;
  enableSwagger: boolean;
  jwt: JWTConfig;
}

export interface JWTConfig {
  secret: string;
  duration: string;
  ignoreExpiration: boolean;
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
    } satisfies JWTConfig
    
  } as IEnvironment);
