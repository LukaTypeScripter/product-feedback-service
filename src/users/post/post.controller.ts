/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from 'src/auth/auth.service';
import { CreatePostDto } from '../user-entity/dtos/entity.dto';
import { PostService } from "../services/post/post.service";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

  @Post('create/:userId')
  create(@Param('userId') userId: number, @Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto, userId);
  }

  @Patch('upvote/:postId')
  upvote(@Param('postId') postId: number) {
    return this.postService.onUpvote(postId);
  }

  @Delete ('remove/:postId')
  removeSpecificPost(@Param('postId') postId: number) {
    return this.postService.removeSpecificPost(postId);
  }


}
