/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateCommentDto } from '../user-entity/dtos/entity.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CommentService } from "../services/comment/comment.service";
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }
  @Post(':parentCommentId/reply')
  async addReply(@Param('parentCommentId') parentCommentId: number, @Body() replyData: Partial<any>) {
    return this.commentService.addReply(parentCommentId, replyData);
  }

  @Post(':parentCommentId/:userId/upvote')
  async addUpvote(@Param('parentCommentId') parentCommentId: number, @Param('userId') userId: number) {
    return this.commentService.onAddUpvoteComment(parentCommentId, userId);
  }

}
