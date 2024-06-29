import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../../users.service';
import { Post } from '../../user-entity/post.entity';
import { UserEntity } from '../../user.entity';
import { CreateCommentDto } from '../../user-entity/dtos/entity.dto';
import { Comment } from '../../user-entity/comment.entity';

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
    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }
}
