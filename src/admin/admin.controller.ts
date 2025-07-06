import {
    Controller,
    Get,
    Param,
    Put,
    Delete,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { AdminService } from './admin.service';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { RolesGuard } from 'src/common/guards/role.guard';
  import { Role } from 'src/common/decorators/role.decorator';
  import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';


  @ApiTags('Admin')
  @Controller('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  @Controller('admin/users')
  export class AdminController {
    constructor(private readonly adminService: AdminService) {}
  
    @Get()
    getAllUsers() {
      return this.adminService.getAllUsers();
    }
  
    @Get(':id')
    getUser(@Param('id') id: string) {
      return this.adminService.getUserById(id);
    }
  
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() dto: any) {
      return this.adminService.updateUser(id, dto);
    }
  
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
      return this.adminService.deleteUser(id);
    }
  }
  