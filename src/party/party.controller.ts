import { Controller, Get } from '@nestjs/common';
import { Party } from './party.entity';
import { PartyService } from './party.service';

@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get()
  getParties(): Promise<Party[]> {
    return this.partyService.findAll();
  }
}
