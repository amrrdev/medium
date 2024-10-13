import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly DTO: Type<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    console.log(`This is an interceptor from common folder.`);
    return next.handle().pipe(
      map((response: T) => {
        return plainToClass(this.DTO, response, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
