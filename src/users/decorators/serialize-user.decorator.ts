import { Type, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor';

export function Serialize<T>(DTO: Type<T>) {
  return UseInterceptors(new SerializeInterceptor(DTO));
}
