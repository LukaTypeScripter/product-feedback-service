/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentDto } from '../user-entity/dtos/entity.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from 'src/auth/auth.service';
@Controller('comment')
export class CommentController {
    constructor(private readonly AuthService: AuthService) {}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.AuthService.createComment(createCommentDto);
  }
}
