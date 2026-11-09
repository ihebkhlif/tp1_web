import { Controller, Get } from '@nestjs/common';
import { UuidTestService } from './uuid-test.service.js';

@Controller('uuid-test')
export class UuidTestController {
    constructor(private readonly uuidTestService: UuidTestService) {}

    @Get()
    generateUuid(): string {
        return this.uuidTestService.generateUuid();
    }
}
