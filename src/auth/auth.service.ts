/* eslint-disable prettier/prettier */
import { Body, Injectable, Param, UnauthorizedException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UsersService } from 'src/users/users.service';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateCommentDto, CreatePostDto } from 'src/users/user-entity/dtos/entity.dto';
import { Comment } from 'src/users/user-entity/comment.entity';
import { Post } from 'src/users/user-entity/post.entity';
import { FileInterceptor } from "@nestjs/platform-express";
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity) private userRepository: Repository<any>,
      ) {}
    
      async signIn(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
    
        
        const user = await this.usersService.findOne(username);
        const isPasswordValid = await bcrypt.compare(pass, user.password);

        
        if (!user || !isPasswordValid) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }

      async createUser(userData: User): Promise<any[]> {
        userData.password = await this.encryptPassword(userData.password);
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }

  async getAllUser(category?: string, sort?: string): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('comment.replies', 'reply')
      .select([
        'user.userId',
        'user.username',
        'user.image',
        'post',
        'comment.id',
        'comment.content',
        'comment.user',
        'comment.upvotes',
        'comment.upvoted',
        'reply.id',
        'reply.content',
        'reply.user',
        'reply.upvotes',
        'reply.upvoted',
        "reply.parentComment"
      ]);

    if (category && category !== 'all') {
      query.where('post.category = :category', { category });
    }

    if (sort) {
      switch (sort) {
        case 'most-upvotes':
          query.orderBy('post.upvotes', 'DESC');
          break;
        case 'least-upvotes':
          query.orderBy('post.upvotes', 'ASC');
          break;
        case 'most-comments':
          query.orderBy('post.commentCount', 'DESC');
          break;
        case 'least-comments':
          query.orderBy('post.commentCount', 'ASC');
          break;
        default:
          break;
      }
    }

    return query.getMany();
  }
    async encryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

  async uploadImage(file:any, userId:any) {
    try {
      const user = await this.userRepository.findOne({ where: { userId: parseInt(userId, 10) } });
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      user.image = file.filename;
      console.log(file.filename)
      await this.userRepository.save(user);
      return {
        message: 'Image uploaded successfully',
        filename: file.filename,
        user: user,
      };
    } catch (error) {
      console.error('Error uploading image:', error.message);
      throw new Error('Failed to upload image');
    }
  }
}
