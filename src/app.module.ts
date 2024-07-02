/* eslint-disable prettier/prettier */
import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostController } from './users/post/post.controller';
import { CommentController } from './users/comment/comment.controller';
import { diskStorage } from "multer";
import { MulterModule } from "@nestjs/platform-express";


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, 
    }),

    AuthModule,
    UsersModule,
  ],
  providers: [AppService
  ],
})
export class AppModule {
  constructor() {
    
  }
}
