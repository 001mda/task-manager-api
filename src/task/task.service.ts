import {
    Injectable,
    NotFoundException,
    ForbiddenException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { CreateTaskDto } from 'src/auth/dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto'; 
  
  @Injectable()
  export class TaskService {
    constructor(private prisma: PrismaService) {}
  
    create(userId: string, dto: CreateTaskDto) {
      return this.prisma.task.create({
        data: {
          title: dto.title,
          userId,
        },
      });
    }
  
    findAll(userId: string) {
      return this.prisma.task.findMany({
        where: { userId },
      });
    }
  
  
    async updateTask(userId: string, taskId: string, dto: UpdateTaskDto) {
      const task = await this.prisma.task.findUnique({ where: { id: taskId } });
  
      if (!task) throw new NotFoundException('Задача не найдена');
      if (task.userId !== userId) throw new ForbiddenException('Нет доступа');
  
      return this.prisma.task.update({
        where: { id: taskId },
        data: dto,
      });
    }
  

    async deleteTask(userId: string, taskId: string) {
      const task = await this.prisma.task.findUnique({ where: { id: taskId } });
  
      if (!task) throw new NotFoundException('Задача не найдена');
      if (task.userId !== userId) throw new ForbiddenException('Нет доступа');
  
      await this.prisma.task.delete({ where: { id: taskId } });
  
      return { message: 'Задача удалена' };
    }
  }
  