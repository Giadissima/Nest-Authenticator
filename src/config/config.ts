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
    ? as NomeClasse crea un oggetto che soddisfa quell'interfaccia, senza fare un effettiva validazione,
    ? nomeObj: <NomeClasse> dà errore se sto instanziando una proprietà che non esiste dentro la classe,
    ? satisfies NomeClasse valida effettivamente l'oggetto, e deve avere tutte e sole le proprietà espresse 
    ? nella classe
  */
    jwt: {
      // TODO perché funziona solo se concateno il secret su una stringa vuota?
      secret: '' + process.env.JWT_SECRET,
      duration: process.env.JWT_EXPIRES_IN || '7d',
      ignoreExpiration: process.env.JWT_IGNORE_EXP == 'true',
    } as JWTConfig
    
  } as IEnvironment);
