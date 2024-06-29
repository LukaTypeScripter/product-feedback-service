/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
export type User = any;
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<any>) {
    }
    
      async findOne(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }
}
