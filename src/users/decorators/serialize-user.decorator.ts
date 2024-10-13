import { Type, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/auth/common/interceptors/user.interceptor';

export function Serialize<T>(DTO: Type<T>) {
  return UseInterceptors(new SerializeInterceptor(DTO));
}
