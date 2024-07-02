/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  
})
export class AuthModule {
  constructor() {
  }
}
