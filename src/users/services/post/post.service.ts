import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../user-entity/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user.entity';
import { CreatePostDto } from '../../user-entity/dtos/entity.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { userId } });
    const post = this.postRepository.create({ ...createPostDto, user });
    return this.postRepository.save(post);
  }
}
