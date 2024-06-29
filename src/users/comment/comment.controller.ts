/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentDto } from '../user-entity/dtos/entity.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from 'src/auth/auth.service';
import { CommentService } from "../services/comment/comment.service";
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }
}
