import { Module } from '@nestjs/common';
import { UuidTestService } from './uuid-test.service.js';

import { UuidTestController } from './uuid-test.controller.js';

@Module({

  controllers: [UuidTestController],
  providers: [UuidTestService]
})
export class UuidTestModule {}
