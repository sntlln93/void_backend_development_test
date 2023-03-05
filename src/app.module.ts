import { Module } from '@nestjs/common';
import { RiotService } from './services/riot/riot.service';
import { FeaturesModule } from './features/features.module';
import { HttpModule } from '@nestjs/axios';
import { DataDragonService } from './services/data-dragon/data-dragon.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), FeaturesModule, HttpModule],
  providers: [RiotService, DataDragonService],
})
export class AppModule {}
