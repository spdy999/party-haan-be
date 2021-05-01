import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  async insert(user: CreateUserDto): Promise<User> {
    const userEntity: User = this.usersRepository.create();
    const { username, password } = user;
    userEntity.username = username;
    userEntity.password = password;

    await this.usersRepository.save(userEntity);

    return userEntity;
  }
}
