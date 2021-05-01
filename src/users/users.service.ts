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

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async insert(user: CreateUserDto): Promise<User> {
    const userEntity: User = this.usersRepository.create();
    const { email, password } = user;
    userEntity.email = email;
    userEntity.password = password;

    await this.usersRepository.save(userEntity);

    return userEntity;
  }
}
