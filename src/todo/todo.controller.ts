import { Body, Controller, Param, ParseIntPipe, Patch, Post, Version, Delete, Get, Query, DefaultValuePipe, Req } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { TodoService } from './todo.service.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { StatusEnum } from './enums/status.enum.js';
import express from 'express';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @Version('1')
  create(
    @Body() createTodoDto: CreateTodoDto
    , @Req() req: express.Request) {
      const userId = (req as any).userId;
    return this.todoService.addTodo(createTodoDto, userId);
  }

    @Post()
    @Version('2')
  createV2() {
    return "todo created with version 2";
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: express.Request) {
      const userId = (req as any).userId;
    return this.todoService.updateTodo(id, updateTodoDto, userId);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: express.Request) {
      const userId = (req as any).userId;
    return this.todoService.deleteTodo(id, userId);
  }

  @Delete('soft/:id')
  softDelete(
    @Param('id', ParseIntPipe) id: number) {
    return this.todoService.SoftDeleteTodo(id);
  }

  @Patch('restore/:id')
  restore(
    @Param('id', ParseIntPipe) id: number) {
    return this.todoService.restoreTodo(id);
  }

  @Get('stats/status')
    countTodosByStatus() {
    return this.todoService.countTodosByStatus();
}

  @Get()
  getAllTodos(
    @Query('search') search?: string,
    @Query('status') status?: StatusEnum,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,) 
    {
      return this.todoService.getAllTodos(
        search, 
        status, 
        page, 
        limit
      );
    }
  

  @Get(':id')
  getTodoById(
    @Param('id', ParseIntPipe) id: number) {
    return this.todoService.GetTodoById(id);
  }
}

