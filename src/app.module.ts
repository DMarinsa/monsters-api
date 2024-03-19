import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MonstersModule } from './monsters/monsters.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/monsters'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MonstersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
