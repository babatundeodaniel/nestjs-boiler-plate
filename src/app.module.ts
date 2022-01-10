import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/Exception-Filters/http-exception.filter';
import { ModelExceptionFilter } from './common/Exception-Filters/model-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.forRoutes(routes),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(connectionOptions),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),
    TestModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ModelExceptionFilter,
    },
  ],
})
export class AppModule {}
