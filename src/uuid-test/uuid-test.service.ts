import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UuidTestService {
    constructor(
        
        @Inject('UUID_GENERATOR') private readonly uuidGenerator: () => string) {}


    generateUuid(): string {
        return this.uuidGenerator();
    }
}
