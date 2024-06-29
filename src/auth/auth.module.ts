/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Post } from 'src/users/user-entity/post.entity';
import { Comment } from 'src/users/user-entity/comment.entity';
import { PostController } from 'src/users/post/post.controller';
import { CommentController } from 'src/users/comment/comment.controller';

@Module({
  controllers: [AuthController,PostController,CommentController],
  providers: [AuthService],
  imports: [UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([UserEntity,Post,Comment]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  
})
export class AuthModule {
  constructor() {
  }
}
