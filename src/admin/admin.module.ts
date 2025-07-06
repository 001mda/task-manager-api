import { Module } from '@nestjs/common';
import { AdminController } from 'src/admin/admin.controller';
import { AdminService } from 'src/admin/admin.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
})
export class AdminModule {}
