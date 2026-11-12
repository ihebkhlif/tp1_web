import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './todo.service.js';
import { TodoController } from './todo.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity.js';
import { AuthMiddleware } from '../common/middlewares/auth/auth.middleware.js';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [
    TodoService,
    AuthMiddleware
  ],
  controllers: [TodoController]
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TodoController);
  }
}
