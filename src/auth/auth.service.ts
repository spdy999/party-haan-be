import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import CreateUserDto from 'src/users/dto/create-user.dto';
import UserLoginDTO from 'src/users/dto/user-login.dto';
import JwtUserPayloadDto from 'src/users/dto/jwt-user-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<JwtUserPayloadDto> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User): UserLoginDTO {
    const payload = { username: user.username, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: CreateUserDto): Promise<User> {
    return this.usersService.insert(user);
  }
}
