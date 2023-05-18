import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logger Interceptor.
 * Creates informative loggs to all requests, showing the path and
 * the method name.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const parentType =context.getArgs()[0].route.path;
    const fieldName = context.getArgs()[0].route.stack[0].method;
    return next.handle().pipe(
      tap(() => {
        Logger.debug(`⛩  ${parentType} » ${fieldName}`, 'RESTful');
      }),
    );
  }
}
