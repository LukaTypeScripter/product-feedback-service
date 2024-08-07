import { Body, Injectable, NotFoundException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Post } from '../../user-entity/post.entity';
import { UserEntity } from '../../user.entity';
import { CreateCommentDto } from '../../user-entity/dtos/entity.dto';
import { Comment } from '../../user-entity/comment.entity';
import { FileInterceptor } from "@nestjs/platform-express";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findOne({
      where: { userId: createCommentDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createCommentDto.userId} not found`,
      );
    }
    const post = await this.postRepository.findOne({
      where: { postId: createCommentDto.postId },
    });
    if (!post) {
      throw new NotFoundException(
        `Post with ID ${createCommentDto.postId} not found`,
      );
    }
    if (!post.comments) {
      post.comments = [];
    }
    post.commentCount = post.comments.length + 1;
    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async addReply(
    parentCommentId: number,
    replyData: Partial<Comment>,
  ): Promise<Comment> {

    const options: FindOneOptions<Comment> = {
      where: { id: parentCommentId },
      relations: ['replies', 'user'],
    };

    try {
      const parentComment = await this.commentRepository.findOne(options);

      const user = await this.userRepository.findOne({ where: { username: replyData.user as string } });

      if(!user) {
        throw new NotFoundException('User not found');
      }
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }

      if (!replyData.user) {
        throw new Error('User not provided for reply comment');
      }
      const replyComment = this.commentRepository.create({
        content: replyData.content,
        user: user,
        parentComment: parentComment,
      });
      const savedReply = await this.commentRepository.save(replyComment);

      parentComment.replies.push(savedReply);
      await this.commentRepository.save(parentComment);

      return savedReply;
    } catch (error) {
      console.error('Error while adding reply comment:', error.message);
      throw error;
    }
  }

  async onAddUpvoteComment(
    commentId: number,
    userId:number
  ) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
        relations: ['replies', 'user'],
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      const user = await this.userRepository.findOne({
        where: { userId: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!comment) {
        throw new NotFoundException('user comment not found');
      }
      if (!comment.upvotes) {
        comment.upvotes = 0;
      }
      if (comment.upvoted) {
        comment.upvotes -= 1;
      } else {
        comment.upvotes += 1;
      }
      return this.commentRepository.save(comment);
    } catch (err) {
      console.error('Error while adding reply comment:', err.message);
      throw err;
    }
  }



}
