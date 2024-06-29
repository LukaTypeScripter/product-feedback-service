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

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: false })
  upvoted: boolean;

  @Column({ default: 'suggestion' })
  status: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, user => user.posts, { nullable: false })
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}