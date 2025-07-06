import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dto/login.dto';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  import { CurrentUser } from 'src/common/decorators/current-user.decorator';
  import { RefreshTokenDto } from './dto/refresh-token.dto';
  import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
  import { ForgotPasswordDto } from './dto/forgot-password.dto';
  import { ResetPasswordDto } from './dto/reset-password.dto';
  import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
  
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    login(@Body() dto: LoginDto) {
      return this.authService.login(dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@CurrentUser() user) {
      return user;
    }
  
    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    refresh(@CurrentUser() user, @Body() dto: RefreshTokenDto) {
      return this.authService.getTokens(user.sub, user.email, user.role);
    }
  
    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto) {
      return this.authService.forgotPassword(dto.email);
    }
  
    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
      return this.authService.resetPassword(dto.token, dto.newPassword);
    }
  }
  