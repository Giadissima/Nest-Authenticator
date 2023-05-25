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
    /* SINTAX EXPLAINING
    ? "as ClassName" creates obj that satisfies that interface, without a real validation,
    ? "nomeObj: <ClassName>" generates an error if there is a property that doesn't exists inside class,
    ? "satisfies ClassName" makes a real validation of the object, and it must have only and every property described in the class
    ? nella classe
  */
    jwt: {
      secret: process.env.JWT_SECRET,
      duration: process.env.JWT_EXPIRES_IN || '7d',
      ignoreExpiration: process.env.JWT_IGNORE_EXP == 'true',
    } as JWTConfig
    
  } as IEnvironment);
