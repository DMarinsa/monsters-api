import { IMonster } from './Monster';

export interface IMonsterRepository {
  getMonsters(): Promise<IMonster[]>;
  getMonsterById(id: string): Promise<IMonster>;
  createMonster(monster: IMonster): Promise<IMonster>;
  updateMonster(monster: IMonster): Promise<IMonster>;
  deleteMonster(id: string): Promise<void>;
}
