import { Injectable } from '@nestjs/common';
import { IMonster } from './Domain/Monster';
import { MongooseMonsterRepository } from './Infrastructure/MongoDb/MongooseMonsterRepository';

@Injectable()
export class MonstersService {
  constructor(private readonly monsterRepository: MongooseMonsterRepository) {}

  async getMonster(id: string): Promise<IMonster> {
    const result = await this.monsterRepository.getMonsterById(id);
    return result;
  }

  async getMonsters(): Promise<IMonster[]> {
    const result = await this.monsterRepository.getMonsters();
    return result;
  }

  async createMonster(monster: IMonster): Promise<IMonster> {
    return this.monsterRepository.createMonster(monster);
  }

  async updateMonster(monster: IMonster): Promise<IMonster> {
    return this.monsterRepository.updateMonster(monster);
  }
}
