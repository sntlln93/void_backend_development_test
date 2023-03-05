import { Injectable } from '@nestjs/common';
import { RiotService } from 'src/services/riot/riot.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(private readonly riotService: RiotService){}

  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  findAll(summoner: string, region: string) {
    return this.riotService.getRecentMatchesIds(summoner, region);
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
