import { Module } from '@nestjs/common';
import {
  Monster,
  MonsterSchema,
} from './Infrastructure/MongoDb/monster.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersResolver } from './Application/monsters.resolver';
import { MongooseMonsterRepository } from './Infrastructure/MongoDb/MongooseMonsterRepository';
import { MonstersService } from './monsters.service';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/lib/Infrastructure/Auth/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Monster.name,
        schema: MonsterSchema,
      },
    ]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [MonstersResolver, MonstersService, MongooseMonsterRepository],
})
export class MonstersModule {}
