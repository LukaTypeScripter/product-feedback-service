/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Comment } from './comment.entity';
import { UserEntity } from '../user.entity';
import { User } from '../users.service';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  upvotes: number;

  @Column()
  upvoted: boolean;

  @Column()
  status: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, user => user.posts)
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}