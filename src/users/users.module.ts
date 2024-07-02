/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostController } from './post/post.controller';
import { CommentController } from './comment/comment.controller';
import { Post } from './user-entity/post.entity';
import { Comment } from './user-entity/comment.entity';
import { PostService } from "./services/post/post.service";
import { CommentService } from "./services/comment/comment.service";
import { UploadController } from "./upload/upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
@Module({
  providers: [UsersService,PostService,CommentService],
  controllers: [CommentController,PostController,UploadController],
  exports: [UsersService,PostService,CommentService],
  // eslint-disable-next-line prettier/prettier
  imports:[
    TypeOrmModule.forFeature([UserEntity,Post,Comment]),
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
export class UsersModule {}
