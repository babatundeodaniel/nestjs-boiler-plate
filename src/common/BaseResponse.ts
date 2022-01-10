import { Response } from 'express';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';

@Controller()
export class BaseResponse {
  async sendError(
    res: Response,
    res_code: string,
    res_des: string,
    error?: any,
    code?: 404,
  ) {
    try {
      res.status(code).json({
        success: false,
        response_code: `${res_code}`,
        response_description: `${res_des}`,
        error: error,
      });
    } catch (error) {
      return this.responseError(
        res,
        'Error Occured',
        error.toString(),
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async sendResponse(
    res: Response,
    res_des: string,
    data: any,
    res_code: string,
    code?: 200,
  ) {
    try {
      res.status(200).json({
        success: true,
        statusCode: code,
        message: `${res_des}`,
        response_code: `${res_code}`,
        response_description: `${res_des}`,
        data,
      });
    } catch (error) {
      return this.responseError(
        res,
        'Error Occured',
        error.toString(),
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  // async sendSuccess(params:type) => {

  // }

  async sendSuccess(
    res: Response,
    res_des: string,
    res_code: string,
    code?: 200,
  ) {
    try {
      res.status(200).json({
        success: true,
        response_code: `${res_code}`,
        response_description: `${res_des}`,
      });
    } catch (error) {
      return this.responseError(
        res,
        'Error Occured',
        error.toString(),
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async responseError(
    res: Response,
    res_des: string,
    res_code: string,
    code?: any,
  ) {
    res.status(400).json({
      success: false,
      response_code: `${res_code}`,
      response_description: `${res_des}`,
    });
  }
}
