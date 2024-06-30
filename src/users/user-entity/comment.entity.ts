/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

import { Post } from './post.entity';
import { UserEntity } from '../user.entity';
import { User } from '../users.service';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, user => user.comments)
  user: User;

  @ManyToOne(() => Post, post => post.comments, { nullable: true })
  post: Post;

  @ManyToOne(() => Comment, parent => parent.replies)
  parentComment: Comment;

  @OneToMany(() => Comment, reply => reply.parentComment)
  replies: Comment[];
}