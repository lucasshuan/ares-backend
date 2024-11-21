import { Module } from '@nestjs/common';
import { ClanService } from './clan.service';

@Module({
  providers: [ClanService],
  exports: [ClanService],
})
export class ClanModule {}
