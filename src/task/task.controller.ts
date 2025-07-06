import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { TaskService } from './task.service';
  import { CreateTaskDto } from 'src/auth/dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto'; 
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { CurrentUser } from 'src/common/decorators/current-user.decorator';
  import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

  @ApiTags('Tasks')
  @UseGuards(JwtAuthGuard)
  @Controller('tasks')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post()
    create(@CurrentUser() user, @Body() dto: CreateTaskDto) {
      return this.taskService.create(user.sub, dto);
    }
  
    @Get()
    findAll(@CurrentUser() user) {
      return this.taskService.findAll(user.sub);
    }
  
    
    @Put(':id')
    update(
      @Param('id') id: string,
      @CurrentUser() user,
      @Body() dto: UpdateTaskDto,
    ) {
      return this.taskService.updateTask(user.sub, id, dto);
    }
  
    
    @Delete(':id')
    delete(@Param('id') id: string, @CurrentUser() user) {
      return this.taskService.deleteTask(user.sub, id);
    }
  }
  