import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { RiotService } from 'src/services/riot/riot.service';
import { HttpModule } from '@nestjs/axios';
import { DataDragonService } from 'src/services/data-dragon/data-dragon.service';

@Module({
  controllers: [MatchController],
  providers: [MatchService, RiotService, DataDragonService],
  imports: [HttpModule]
})
export class MatchModule {}
