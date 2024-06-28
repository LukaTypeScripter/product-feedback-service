import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  // eslint-disable-next-line prettier/prettier
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
  ]
})
export class UsersModule {}
