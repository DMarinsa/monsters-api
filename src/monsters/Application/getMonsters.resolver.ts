import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class MonstersResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
