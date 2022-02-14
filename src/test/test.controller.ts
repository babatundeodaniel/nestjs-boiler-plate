import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Logger } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { BaseController } from 'src/common/base.controller';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@ApiTags('Test')
@ApiBearerAuth()
@Controller('test')
export class TestController extends BaseController {
  constructor(private readonly testService: TestService) {
    super();
  }

  //async onApplicationBootstrap() { await this._clientProxyUser.connect();}

  @Post()
  create(@Body() createTestDto: CreateTestDto, @Res({ passthrough: true }) res: Response) {
    const test = this.testService.create(createTestDto);
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Get()
  async findAll( @Res({ passthrough: true }) res: Response) {
    const test = await this.testService.findAll();
    await this.testService.accumulate();
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    //const test = this.testService.findOne(+id);
    await this.testService.accumulate();
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto, @Res({ passthrough: true }) res: Response) {
    const test = this.testService.update(+id, updateTestDto);
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const test = this.testService.remove(+id);
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @MessagePattern('notifications')
  notification(@Payload() data: number[], @Ctx() context: RmqContext){
    console.log(`Pattern: ${context.getPattern()}`);
  }
}
