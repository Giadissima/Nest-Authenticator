export interface IEnvironment {
  environment: 'production' | 'development';
  port: number;
  enableSwagger: boolean;
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
    
  } as IEnvironment);
