import { Body, Controller, Get, Post } from '@nestjs/common';
import { Parties } from './parties.entity';
import { PartiesService } from './parties.service';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Get()
  async getParties(): Promise<Parties[]> {
    return this.partiesService.findAll();
  }

  @Post()
  async createParty(@Body() body: Parties): Promise<Parties> {
    return this.partiesService.create(body.name, body.capacity, body.imgUrl);
  }
}
