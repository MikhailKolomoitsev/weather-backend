import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config.service';
import { AuthModule } from './modules/auth/auth.module';
import { Guard } from './modules/auth/guard/guard';
import { UsersModule } from './modules/users/users.module';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: Guard,
    },
  ],
})
export class AppModule {}
