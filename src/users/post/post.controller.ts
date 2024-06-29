/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from 'src/auth/auth.service';
import { CreatePostDto } from '../user-entity/dtos/entity.dto';
import { PostService } from "../services/post/post.service";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post(':userId')
    create(@Param('userId') userId: number, @Body() createPostDto: CreatePostDto) {
      return this.postService.createPost(createPostDto, userId);
    }
}
