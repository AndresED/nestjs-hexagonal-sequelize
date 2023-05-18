import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.getArgByIndex(1);
    const request = ctx;
    return next.handle().pipe(
      map(
        data => {
          return {
            statusCode: request.statusCode,
            error: false,
            data
          };
        },
      ),
    );;
  }
}
