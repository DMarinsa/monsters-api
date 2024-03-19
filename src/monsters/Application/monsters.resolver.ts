import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { IMonster } from '../Domain/Monster';
import { Monster } from '../Infrastructure/MongoDb/monster.schema';
import { Injectable } from '@nestjs/common';
import { MonstersService } from '../monsters.service';

@Injectable()
@Resolver(() => Monster)
export class MonstersResolver {
  constructor(private readonly monstersService: MonstersService) {}

  @Query(() => [Monster])
  async monster(@Args('id', { type: () => ID }) id: string): Promise<IMonster> {
    const result = await this.monstersService.getMonster(id);
    return result;
  }

  @Query(() => [Monster])
  async monsters(): Promise<IMonster[]> {
    const result = await this.monstersService.getMonsters();
    return result;
  }

  @Mutation(() => Monster)
  async createMonster(monster: IMonster): Promise<IMonster> {
    return this.monstersService.createMonster(monster);
  }

  @Mutation(() => Monster)
  async updateMonster(monster: IMonster): Promise<IMonster> {
    return this.monstersService.createMonster(monster);
  }

  @Mutation(() => Monster)
  async deleteMonster(monster: IMonster): Promise<IMonster> {
    return this.monstersService.createMonster(monster);
  }
}
