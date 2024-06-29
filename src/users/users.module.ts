/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostController } from './post/post.controller';
import { CommentController } from './comment/comment.controller';
import { Post } from './user-entity/post.entity';
import { Comment } from './user-entity/comment.entity';
@Module({
  providers: [UsersService,

  ],
  exports: [UsersService],
  // eslint-disable-next-line prettier/prettier
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
 
  ],
})
export class UsersModule {}
