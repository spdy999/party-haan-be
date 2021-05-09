import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import CreateUserDto from './users/dto/create-user.dto';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import UserLoginDTO from './users/dto/user-login.dto';
import { PartiesService } from './parties/parties.service';
import { PartiesUsers } from './parties-users/parties-users.entity';
import { HttpException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private partiesService: PartiesService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/signup')
  async signUp(@Body() user: CreateUserDto): Promise<UserLoginDTO> {
    return this.authService.signUp(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  login(@Request() req: { user: User }): UserLoginDTO {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: User }): User {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('parties/join')
  async joinParty(
    @Request() req: { user: User },
    @Body() body: { partyId: number },
  ): Promise<PartiesUsers> {
    const { user } = req;
    const { partyId } = body;
    const partiesUsers = await this.partiesService.join(user, partyId);
    if (!partiesUsers) {
      throw new HttpException('No capacity', 400);
    }
    return partiesUsers;
  }
}
