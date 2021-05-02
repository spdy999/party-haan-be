import { Controller, Get } from '@nestjs/common';
import { Parties } from './parties.entity';
import { PartiesService } from './parties.service';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Get()
  getParties(): Promise<Parties[]> {
    return this.partiesService.findAll();
  }
}
