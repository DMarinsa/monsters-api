import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Country } from '../../../lib/constants/countries';
import { Gender, IMonster, Title } from '../../../monsters/Domain/Monster';

export type MonsterDocument = HydratedDocument<Monster>;

@ObjectType(Monster.name)
@Schema()
export class Monster implements IMonster {
  @Field(() => ID)
  _id: string;
  @Field()
  @Prop({ required: true })
  firstName: string;
  @Field()
  @Prop({ equired: true })
  lastName: string;
  @Field()
  @Prop({ required: true })
  title: Title;
  @Field(() => [String])
  @Prop({ type: Array<string>, required: true })
  nationalities: Country[];
  @Field(() => String)
  @Prop({ required: true })
  gender: Gender;
  @Field()
  @Prop({ required: true })
  image: string;
  @Field()
  @Prop({ required: true })
  goldBalance: number;
  @Field()
  @Prop({ required: true })
  speed: number;
  @Field()
  @Prop({ required: true })
  health: number;
  @Field()
  @Prop()
  secretNotes: string;
  @Field()
  @Prop({ required: true })
  password: string;
  @Field()
  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
  @Field()
  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
