import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { EloModule } from '../elo/elo.module';

@Module({
  imports: [EloModule],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
