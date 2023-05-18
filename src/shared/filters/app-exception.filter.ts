import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const exep = exception as HttpException;
    const responseError: any = exep.getResponse();
    response.status(status).json({
      statusCode: status,
      error: true,
      path: request.url,
      timestamp: new Date(),
      data: responseError.message,
    });
  }
}
