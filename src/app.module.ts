import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Monster,
  MonsterSchema,
} from './monsters/Infrastructure/MongoDb/monster.schema';
import { join } from 'path';
import { MonstersResolver } from './monsters/Application/getMonsters.resolver';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/monsters'),
    MongooseModule.forFeature([
      {
        name: Monster.name,
        schema: MonsterSchema,
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MonstersResolver],
})
export class AppModule {}
