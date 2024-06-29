import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async removeSpecificPost(postId: number) {
    if (!postId) {
      throw new NotFoundException('Please provide postId');
    }
    const post = await this.postRepository.findOne({
      where: { postId: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.delete({ postId: postId });
  }

  async onUpvote(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { postId: postId  },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.upvoted) {
      post.upvotes += -1;
      post.upvoted = false;
    } else {
      post.upvotes += 1;
      post.upvoted = true;
    }

    return this.postRepository.save(post);
  }
}
