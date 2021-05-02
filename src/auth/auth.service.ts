import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import CreateUserDto from 'src/users/dto/create-user.dto';
import UserLoginDTO from 'src/users/dto/user-login.dto';
import JwtUserPayloadDto from 'src/users/dto/jwt-user-payload.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<JwtUserPayloadDto> {
    const user: User = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User): UserLoginDTO {
    const payload = { email: user.email, id: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }

  async signUp(user: CreateUserDto): Promise<User> {
    return this.usersService.insert(user);
  }
}
