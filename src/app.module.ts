import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/config'; // il nome configuration gliel'ho dato in questo momento, posso chiamarlo come voglio

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [configuration],
    }),
    AuthModule,
    UsersModule,],
  providers: [AppService],
})
export class AppModule {}
