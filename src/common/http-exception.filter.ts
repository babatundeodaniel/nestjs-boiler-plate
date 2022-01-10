
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadGatewayException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status:any = exception.getStatus() || 500;
    if(exception instanceof BadGatewayException){
      status = 'SPL0001'
    } else if(exception instanceof NotFoundException){
      status = 'SPL0002'
    }

    response
      .status(status)
      .json({
        statusCode: status,
        status: 'error',
        message: 'Bad request',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
