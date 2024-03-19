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

  async getMonsters(): Promise<IMonster[]> {
    return this.monsterModel.find();
  }

  async getMonsterById(id: string): Promise<IMonster> {
    return this.monsterModel.findOne({ _id: id });
  }

  async createMonster(monster: IMonster): Promise<IMonster> {
    return this.monsterModel.create(monster);
  }

  async updateMonster(monster: IMonster): Promise<IMonster> {
    return this.monsterModel.findOneAndUpdate({ _id: monster._id }, monster);
  }

  async deleteMonster(id: string): Promise<void> {
    return this.monsterModel.findOneAndDelete({ _id: id });
  }
}
