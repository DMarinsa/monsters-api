import { Country } from '../../lib/constants/countries';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum Title {
  Mr = 'mr',
  Mrs = 'mrs',
  Ms = 'ms',
  Dr = 'dr',
}

export interface IMonster {
  _id: string;
  firstName: string;
  lastName: string;
  title: Title;
  gender: Gender;
  nationalities: Country[];
  image: string;
  goldBalance: number;
  speed: number;
  health: number;
  secretNotes: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IMonsterDto = Omit<IMonster, '_id' | 'createdAt' | 'updatedAt'> & {
  _id?: string;
};
