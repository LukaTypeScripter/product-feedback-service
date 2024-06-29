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
@Module({
  providers: [UsersService,PostService,CommentService],
  controllers: [CommentController,PostController],
  exports: [UsersService,PostService,CommentService],
  // eslint-disable-next-line prettier/prettier
  imports:[
    TypeOrmModule.forFeature([UserEntity,Post,Comment]),
 
  ],
})
export class UsersModule {}
