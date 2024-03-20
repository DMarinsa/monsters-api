import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { IMonster, IMonsterDto } from '../Domain/Monster';
import { Monster } from '../Infrastructure/MongoDb/monster.schema';
import { Injectable } from '@nestjs/common';
import { MonstersService } from '../monsters.service';
import { MonsterDto } from '../Infrastructure/GraphQL/monsterDTO.schema';

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
  async createMonster(
    @Args('monster') monster: MonsterDto, // Cambia el tipo de dato aquí
  ): Promise<Monster> {
    return this.monstersService.createMonster(monster);
  }

  @Mutation(() => Monster)
  async updateMonster(monster: IMonster): Promise<IMonster> {
    return this.monstersService.createMonster(monster);
  }

  @Mutation(() => Monster)
  async deleteMonster(id: string): Promise<void> {
    await this.monstersService.deleteMonster(id);
  }
}
