import { Controller, Get, Post, Req } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Parties } from './parties.entity';
import { PartiesService } from './parties.service';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Get()
  getParties(): Promise<Parties[]> {
    return this.partiesService.findAll();
  }

  @Post('/join')
  async joinParty(@Req() req: { user: User; party: Parties }): Promise<void> {
    const { user, party } = req;
    await this.partiesService.join(user, party);
    return;
  }
}
