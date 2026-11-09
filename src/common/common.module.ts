
import { Global, Module } from '@nestjs/common';
import { v4 } from 'uuid';

@Global()
@Module({
  providers: [
    {
      provide: 'UUID_GENERATOR',
      useValue: v4,
    },
  ],
  exports: ['UUID_GENERATOR'],
})
export class CommonModule {}
