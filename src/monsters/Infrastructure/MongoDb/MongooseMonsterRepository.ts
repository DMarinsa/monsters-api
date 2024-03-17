import { InjectModel } from '@nestjs/mongoose';
import { IMonster } from 'src/monsters/Domain/Monster';
import { IMonsterRepository } from 'src/monsters/Domain/MonsterRepository';
import { Monster, MonsterDocument } from './monster.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MongooseMonsterRepository implements IMonsterRepository {
  constructor(
    @InjectModel(Monster.name)
    private readonly monsterModel: Model<MonsterDocument>,
  ) {}
  getMonsters(): Promise<IMonster[]> {
    throw new Error('Method not implemented.');
  }
  getMonsterById(id: string): Promise<IMonster> {
    throw new Error('Method not implemented.');
  }
  createMonster(monster: IMonster): Promise<IMonster> {
    throw new Error('Method not implemented.');
  }
  updateMonster(monster: IMonster): Promise<IMonster> {
    throw new Error('Method not implemented.');
  }
  deleteMonster(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
