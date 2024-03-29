<p align="center">
  <img src="assets/logo.png" width="200" alt="Nest-Authenticator Logo" />
</p>

<div align="center">
<a href="https://paypal.me/Giadissima1234?country.x=IT&locale.x=it_IT" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://t.me/Giadissima1234" target="_blank"><img src="assets/telegram.png" width=30/></a>
<a href="https://www.instagram.com/giadissima___/" target="_blank"><img src="assets/instagram.png" width=30/></a>
</div>

# Description

Portable project in NestJs to create routes only accessible through Jwt authentication. It also connects with Mongo Db and hashes users' passwords with Bcrypt library. Use of Swagger to create important test's API

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

In case you're using Vs-Code as you're IDE, make sure you've "[Better comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)" extension installed to improve you're coding experience

## MongoDb

MongoDb is a very powerful and simple to use database.
To be able to download the database to your machine look at this [link](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). After having correctly installed MongoDb, all you have to do is download [MongoDb Compass](https://www.mongodb.com/products/compass), a graphical environment to be able to create new databases, collections (similar to "tables") and documents (similar to "rows"). I therefore recommend downloading Compass as a Test application that you can use on your computer.

Finally, in order to connect the database to this application, you just need to correctly insert the [environment variables](https://github.com/Giadissima/Nest-Authenticator#env-variables) as described below

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

You can use, for example, a randomized string

### JWT_EXPIRES_IN

> Choose when to expire the jwt token  
**Default value:** seven days ("7d")

### JWT_IGNORE_EXP

> Choose whether the token, even if expired, can still be used to access private routes. It may be useful to set it to true in the development environment  
**Default value:** false

### MONGO_AUTH_SOURCE

> Specify the database name associated with the user’s credentials.  
**Default value:** admin

### MONGO_APP_NAME

> Set the name of the application that is interacting with the database. In case of an error, the database will give the name of the app on which it occurred. Therefore useful in case the database is used by several applications.  
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

> Specifies the salt for hashing password. Salt is a very important string, similar to [Jwt secret](https://github.com/Giadissima/Nest-Authenticator#jwt_ignore_exp), writed above, **Make sure of not leave this env variable empty for avoid security breach**. For generating a salt, use this commands:

```js
const bcrypt = require("bcrypt");
async genSalt(){
    bcrypt.genSalt(10, function (err, salt) {
      console.log(salt); // the random salt string
    });;
}
```

## How to use my authenticator in your projects:

1) copy my auth folder in your project.

2) Add the env variables needed in my project and copy or add my src/config/config.ts file

3) Add this commands in your main.ts:

   ```ts
   if (configService.getOrThrow<boolean>('enableSwagger')) {
       const config = new DocumentBuilder()
         .addBearerAuth()
         .setTitle(configService.getOrThrow<string>('appName'))
         .setVersion(version);
       if (isProductionEnv) {
         config.addServer('/api');
       }
   const document = SwaggerModule.createDocument(app, config.build());
   SwaggerModule.setup(`/swagger`, app, document, {
     customSiteTitle: 'Your-project-name',
     swaggerOptions: {
       persistAuthorization: true,
     },
   });
   ```

4) In your private route (inside the controller) add these tags:

   ```ts
   import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
   import { Controller, Get, UseGuards } from '@nestjs/common';
   
   import { AuthGuard } from 'src/auth/auth.guard';
   
   @Controller()
   @ApiBearerAuth()
   export class PrivateController {
     @ApiTags('Private')
     @UseGuards(AuthGuard) // decorator needed to make the route private, and only accessible via authentication
     @Get('private-route')
     /* This function allows the user to see a message only if client token is valid (see AuthGuard) */
     privateRoute():string  {
       return "you have the right access to see this message"
     }
   }
   ```

   

5. If everything goes correctly, now you can see on SwaggerUI (search on browser your server URL + /swagger route) a button on the top with "authorize" text, and your private route with a padlock icon
