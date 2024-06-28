/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity) private userRepository: Repository<any>
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

      async createUser(userData: User): Promise<UserEntity> {
        userData.password = await this.encryptPassword(userData.password);
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }
    
    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find({ select: ["userId", "username"] });
    }
    async encryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}
