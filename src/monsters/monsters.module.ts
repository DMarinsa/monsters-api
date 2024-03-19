import { Module } from '@nestjs/common';
import {
  Monster,
  MonsterSchema,
} from './Infrastructure/MongoDb/monster.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersResolver } from './Application/monsters.resolver';
import { MongooseMonsterRepository } from './Infrastructure/MongoDb/MongooseMonsterRepository';
import { MonstersService } from './monsters.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Monster.name,
        schema: MonsterSchema,
      },
    ]),
  ],
  providers: [MonstersResolver, MonstersService, MongooseMonsterRepository],
})
export class MonstersModule {}
