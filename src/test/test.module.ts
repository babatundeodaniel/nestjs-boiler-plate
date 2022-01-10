import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [TypeOrmModule.forFeature([Test])]
})
export class TestModule {}
