<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">NestJs is a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Portable project in [Nest](https://github.com/nestjs/nest) to create routes only accessible through [Jwt Authentication](https://docs.nestjs.com/security/authentication#jwt-token). It also connects with [Mongo Db](https://www.mongodb.com/it-it) and hashes users' passwords with [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) library. Use of [Swagger](https://docs.nestjs.com/openapi/introduction) to create important test's API (without use external software like [Postman](https://www.postman.com/))

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Recommended

In case you're using Vs-Code as you're IDE, make sure you've "Better comments" extension installed to improve you're coding experience

## MongoDb

MongoDb è un database molto potente e semplice da usare.
Per poter scaricare il database sulla tua macchina guarda questo [link](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). Dopo avere correttamente installato MongoDb non dovrai fare altro che scaricare [MongoDb Compass](https://www.mongodb.com/products/compass), un IDE grafico per poter creare tramite ambiente grafico nuovi database, collection (similar to "tables") e document (similar to "rows"). Consiglio quindi di scaricare Compass come applicazione di Test da poter mettere nel tuo computer.

Per poter infine connettere il database alla tua applicazione, ti basta inserire correttamente le [variabili d'ambiente](https://github.com/Giadissima/Nest-Authenticator#env-variables) come descritto sotto

## Env variables

### NODE_ENV

> Specify if you're using this app in production or development environment  
**Default value:** development

### PORT

> Specify the port where server will listen and waiting for clients' responses
**Default value:** 3000

### ENABLE_SWAGGER

> Boolean variable that allows you to turn on and off Swagger API. (In production environment automatically turned off)
**Default value:** false

### APP_NAME

> Setting app's name.
**Default value:** Nest-Middlewares-with-Swagger

### JWT_SECRET

> Specify the jwt secret for generating new tokens and validate old tokens. **Make sure of not leave this env variable empty for avoid security breach**

### JWT_EXPIRES_IN

> Sceglie quando far scadere il token jwt
**Default value:** seven days ("7d")

### JWT_IGNORE_EXP

> Sceglie se il token, anche se scaduto, può essere comunque utilizzato per accedere alle route private. Può essere utile settarlo a true nel ambiente di sviluppo
**Default value:** false

### MONGO_AUTH_SOURCE

> Specify the database name associated with the user’s credentials.  
**Default value:** admin

### MONGO_APP_NAME

> Setta il nome dell'applicazione che sta interagendo con il database. In caso di errore, il database darà il nome dell'app su cui si è verificata. Utile quindi in caso il database venga utilizzato da più applicazioni.  
**Default value:** Nest-Middlewares-with-Swagger

### MONGO_AUTO_INDEX

> Set to false to disable automatic index creation for all models associated with this connection.  
**Default value:** true

### MONGO_POOL_SIZE

> Select the maximum number of database connections that can be open at the same time
**Default value:** 50

### MONGO_SERVER_TIMEOUT

> Specifies how long (in milliseconds) to block for server selection before throwing an exception.
**Default value:** 10000

### MONGO_IP_FAMILY

> specifies whether your application that will talk to the database will have an ipv4 or ipv6
**Default value:** 4

### USER_DTO_USERNAME_MIN_LENGHT

> Minimum lenght of the username string received by the client
**Default value:** 0

### USER_DTO_USERNAME_MAX_LENGHT

> Maximum lenght of the username string received by the client
**Default value:** 500

### USER_DTO_PASSWORD_MIN_LENGHT

> Minimum lenght of the password string received by the client
**Default value:** 0

### USER_DTO_PASSWORD_MAX_LENGHT

> Maximum lenght of the password string received by the client
**Default value:** 500

### BCRYPT_SALT

> Specifies the salt for hashing password. Salt is a very important string (is similar to [Jwt secret](https://github.com/Giadissima/Nest-Authenticator#jwt_ignore_exp), writed above), **Make sure of not leave this env variable empty for avoid security breach**. You can use a randomic generated password as Salt as well.

## da inserire TODO

utilizzo mongodb

// TODO cambiare lingua