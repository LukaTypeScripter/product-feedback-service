/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards,  Request } from '@nestjs/common';
import { Body,  Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/users.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    @Post('register')
    async register(@Body() userData: User) {
      return this.authService.createUser(userData);
    }
    @Get('allUser')
    async getAllUser() {
      return this.authService.getAllUser()
    }
}
