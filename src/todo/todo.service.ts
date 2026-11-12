
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { StatusEnum } from './enums/status.enum.js';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async addTodo(createTodoDto: CreateTodoDto, userId: string) {
    const todo = this.todoRepository.create({...createTodoDto,userId: userId});

    return await this.todoRepository.save(todo);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto, userId: string) {
  const todo = await this.todoRepository.findOneBy({ id, userId });

  if (!todo) {
    throw new NotFoundException(`Todo with ID ${id} not found Or you are not authorized to update it`);
  }

  Object.assign(todo, updateTodoDto);

  return this.todoRepository.save(todo);
}
async deleteTodo(id: number, userId: string) {
  const todo = await this.todoRepository.findOneBy({ id, userId });
  if (!todo) {
    throw new NotFoundException(`Todo with ID ${id} not found Or you are not authorized to delete it`);
  }
  return this.todoRepository.remove(todo);
}
async SoftDeleteTodo(id: number) {
  const todo = await this.todoRepository.findOneBy({ id });
  if (!todo) {
    throw new NotFoundException(`Todo with ID ${id} not found`);
  }
  return this.todoRepository.softRemove(todo);
}

async restoreTodo(id: number) {
  const todo = await this.todoRepository.findOne({
    where: { id },
    withDeleted: true,
  });
  if (!todo || !todo.deletedAt) {
    throw new NotFoundException(`Todo with ID ${id} not found or not deleted`);
  }
  return this.todoRepository.restore(id);
}

async countTodosByStatus() {
  const results = await this.todoRepository
    .createQueryBuilder('todo')
    .select('todo.status', 'status')
    .addSelect('COUNT(todo.id)', 'count')
    .groupBy('todo.status')
    .getRawMany();

  const counts = Object.fromEntries(
    Object.values(StatusEnum).map(status => [status, 0])
  );

  results.forEach(result => {
    counts[result.status] = Number(result.count);
  });

  return counts;
}

async getAllTodos(
  search?: string,
  status?: StatusEnum,
  page: number = 1,
  limit: number = 10,
) {
  if (page < 1) {
    throw new BadRequestException('Page number must be greater than 0');
  }
  const query = this.todoRepository.createQueryBuilder('todo');

  if (search) {
    query.andWhere(
      new Brackets((qb) => {
        qb.where('todo.name LIKE :search')
          .orWhere('todo.description LIKE :search');
      }),
      { search: `%${search}%` },
    );
  }

  if (status) {
    query.andWhere('todo.status = :status', { status });
  }
  const [todos, total] = await query
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    data: todos,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

}

async GetTodoById(id: number) {
  const todo = await this.todoRepository.findOneBy({ id });
  if (!todo) {
    throw new NotFoundException(`Todo with ID ${id} not found`);
  }
  return todo;
}
}
