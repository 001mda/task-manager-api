import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { LoginDto } from './dto/login.dto';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { v4 as uuidv4 } from 'uuid';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly jwt: JwtService,
    ) {}
  
    async login(dto: LoginDto) {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
  
      if (!user) {
        throw new UnauthorizedException('Неверный email или пароль');
      }
  
      const passwordValid = await bcrypt.compare(dto.password, user.password);
      if (!passwordValid) {
        throw new UnauthorizedException('Неверный email или пароль');
      }
  
      return this.getTokens(user.id, user.email, user.role);
    }
  
    async getTokens(userId: string, email: string, role: string) {
      const payload = { sub: userId, email, role };
  
      const access_token = await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
  
      const refresh_token = await this.jwt.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      });
  
      return {
        access_token,
        refresh_token,
      };
    }
  
    async forgotPassword(email: string) {
      const user = await this.prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        throw new NotFoundException('Пользователь с таким email не найден');
      }
  
      const resetToken = uuidv4();
  
      await this.prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), 
        },
      });
  
      // Здесь можно подключить почтовый сервис
      console.log(`🔑 Ссылка для сброса пароля: http://localhost:4000/reset-password?token=${resetToken}`);
  
      return { message: 'Ссылка для сброса отправлена (проверь email или консоль)' };
    }
  
    async resetPassword(token: string, newPassword: string) {
      const record = await this.prisma.passwordResetToken.findUnique({
        where: { token },
      });
  
      if (!record || record.expiresAt < new Date()) {
        throw new BadRequestException('Неверный или истёкший токен');
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      await this.prisma.user.update({
        where: { id: record.userId },
        data: { password: hashedPassword },
      });
  
      await this.prisma.passwordResetToken.delete({ where: { token } });
  
      return { message: 'Пароль успешно обновлён' };
    }
  } 
  