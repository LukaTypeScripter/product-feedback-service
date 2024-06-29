import { Injectable } from '@nestjs/common';
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
    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId },
    });
    const comment = this.commentRepository.create({
      ...createCommentDto,
      userId: user.userId,
      postId: post.id,
    } as DeepPartial<Comment>);
    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['user', 'post'] });
  }
}
