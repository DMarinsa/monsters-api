import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { IMonster } from '../Domain/Monster';
import { Monster } from '../Infrastructure/MongoDb/monster.schema';
import { Injectable, UseGuards } from '@nestjs/common';
import { MonstersService } from '../monsters.service';
import { MonsterDto } from '../Infrastructure/GraphQL/monsterDTO.schema';
import { AuthGuard } from '../../lib/Infrastructure/Auth/guards/auth.guard';

@Injectable()
@Resolver(() => Monster)
export class MonstersResolver {
  constructor(private readonly monstersService: MonstersService) {}

  @Query(() => Monster)
  async monster(@Args('id', { type: () => ID }) id: string): Promise<IMonster> {
    return this.monstersService.getMonster(id);
  }

  @Query(() => [Monster])
  async monsters(): Promise<IMonster[]> {
    const result = await this.monstersService.getMonsters();
    return result;
  }

  @Mutation(() => Monster)
  @UseGuards(AuthGuard)
  async createMonster(@Args('monster') monster: MonsterDto): Promise<Monster> {
    return await this.monstersService.createMonster(monster);
  }

  @Mutation(() => Monster)
  @UseGuards(AuthGuard)
  async updateMonster(@Args('monster') monster: MonsterDto): Promise<IMonster> {
    return this.monstersService.updateMonster(monster);
  }

  @Mutation(() => Monster)
  @UseGuards(AuthGuard)
  async deleteMonster(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<void> {
    await this.monstersService.deleteMonster(id);
  }
}
