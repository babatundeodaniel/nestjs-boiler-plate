import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { BaseController } from 'src/common/base.controller';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Test')
@ApiBearerAuth()
@Controller('test')
export class TestController extends BaseController {
  constructor(private readonly testService: TestService) {
    super();
  }

  @Post()
  create(@Body() createTestDto: CreateTestDto, @Res({ passthrough: true }) res: Response,) {
    const test = this.testService.create(createTestDto);
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Get()
  findAll( @Res({ passthrough: true }) res: Response,) {
    const test = this.testService.findAll();
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const test = this.testService.findOne(+id);
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto, @Res({ passthrough: true }) res: Response,) {
    const test = this.testService.update(+id, updateTestDto);
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response,) {
    const test = this.testService.remove(+id);
    return this.responseSuccess(res, '00', 'Success', test, HttpStatus.OK);
  }
}
