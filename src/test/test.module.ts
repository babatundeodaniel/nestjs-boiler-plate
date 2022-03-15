import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvService } from 'src/common/env.service';
const env = new EnvService().read();

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [
    TypeOrmModule.forFeature([Test]),
    ClientsModule.register([
      {
        name: 'TEST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`${env.RMQ_URL}`],
          queue: `${env.RMQ_QUEUE}`,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ]
})
export class TestModule {}
