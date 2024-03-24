import { Field, InputType } from '@nestjs/graphql';
import { Country } from '../../../lib/Domain/constants/countries';
import { Gender, IMonsterDto, Title } from '../../../monsters/Domain/Monster';

@InputType(MonsterDto.name)
export class MonsterDto implements IMonsterDto {
  @Field({ nullable: true })
  _id?: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  title: Title;
  @Field(() => [String])
  nationalities: Country[];
  @Field(() => String)
  gender: Gender;
  @Field()
  image: string;
  @Field()
  goldBalance: number;
  @Field()
  speed: number;
  @Field()
  health: number;
  @Field()
  secretNotes: string;
  @Field()
  password: string;
}
