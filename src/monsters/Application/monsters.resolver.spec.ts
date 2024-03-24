import { Test, TestingModule } from '@nestjs/testing';
import { MonstersResolver } from './monsters.resolver';
import { MonsterDto } from '../Infrastructure/GraphQL/monsterDTO.schema';
import {
  Monster,
  MonsterSchema,
} from '../Infrastructure/MongoDb/monster.schema';
import { MonstersService } from '../monsters.service';
import { Gender, IMonster, Title } from '../Domain/Monster';
import { Country } from '../../lib/Domain/constants/countries';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseMonsterRepository } from '../Infrastructure/MongoDb/MongooseMonsterRepository';

const getMonsterMock = (monster?: any): IMonster => ({
  _id: 'someId',
  firstName: 'someName',
  lastName: 'someLastName',
  title: Title.Mr,
  gender: Gender.Male,
  nationalities: [Country.Spain],
  image: 'someImage',
  goldBalance: 1,
  speed: 2,
  health: 3,
  secretNotes: 'someNotes',
  password: 'somePassword',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...monster,
});

describe('MonstersResolver', () => {
  let resolver: MonstersResolver;
  let service: MonstersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Aquí importa los módulos necesarios, como MongooseModule
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: 'Monster', schema: MonsterSchema }]),
      ],
      providers: [MonstersResolver, MonstersService, MongooseMonsterRepository],
    }).compile();

    resolver = module.get<MonstersResolver>(MonstersResolver);
    service = module.get<MonstersService>(MonstersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('monster', () => {
    it('should return a monster if it exists', async () => {
      const monsterMock = getMonsterMock();
      const id = monsterMock._id;
      jest.spyOn(service, 'getMonster').mockResolvedValue(monsterMock);

      const result = await resolver.monster(id);

      expect(result).toEqual(monsterMock);
      expect(service.getMonster).toHaveBeenCalledWith(id);
    });

    it('should return null if the monster does not exist', async () => {
      const id = 'nonExistingId';
      jest.spyOn(service, 'getMonster').mockResolvedValue(null);

      const result = await resolver.monster(id);

      expect(result).toBeNull();
      expect(service.getMonster).toHaveBeenCalledWith(id);
    });
  });

  describe('monsters', () => {
    it('should return an array of monsters', async () => {
      const monsters: Monster[] = [
        getMonsterMock({ _id: 'first' }),
        getMonsterMock({ _id: 'second' }),
      ];
      jest.spyOn(service, 'getMonsters').mockResolvedValue(monsters);

      const result = await resolver.monsters();

      expect(result).toEqual(monsters);
      expect(service.getMonsters).toHaveBeenCalled();
    });
  });

  describe('createMonster', () => {
    it('should create a new monster', async () => {
      const monsterDto: MonsterDto = {
        firstName: 'someName',
        lastName: 'someLastName',
        title: Title.Mr,
        gender: Gender.Male,
        nationalities: [Country.Spain],
        image: 'someImage',
        goldBalance: 1,
        speed: 2,
        health: 3,
        secretNotes: 'someNotes',
        password: 'somePassword',
      };
      const createdMonster = getMonsterMock(monsterDto);

      jest.spyOn(service, 'createMonster').mockResolvedValue(createdMonster);

      const result = await resolver.createMonster(monsterDto);

      expect(result).toEqual(createdMonster);
      expect(service.createMonster).toHaveBeenCalledWith(monsterDto);
    });
  });

  describe('updateMonster', () => {
    it('should update an existing monster', async () => {
      const monsterDto: MonsterDto = {
        firstName: 'someName',
        lastName: 'someLastName',
        title: Title.Mr,
        gender: Gender.Male,
        nationalities: [Country.Spain],
        image: 'someImage',
        goldBalance: 1,
        speed: 2,
        health: 3,
        secretNotes: 'someNotes',
        password: 'somePassword',
      };
      const updatedMonster = getMonsterMock(monsterDto);
      jest.spyOn(service, 'updateMonster').mockResolvedValue(updatedMonster);

      const result = await resolver.updateMonster(monsterDto);

      expect(result).toEqual(updatedMonster);
      expect(service.updateMonster).toHaveBeenCalledWith(monsterDto);
    });

    it('should return null if the monster to update does not exist', async () => {
      const nonExistingMonsterDto: MonsterDto = getMonsterMock();

      jest.spyOn(service, 'updateMonster').mockResolvedValue(null);

      const result = await resolver.updateMonster(nonExistingMonsterDto);

      expect(result).toBeNull();
      expect(service.updateMonster).toHaveBeenCalledWith(nonExistingMonsterDto);
    });
  });

  describe('deleteMonster', () => {
    it('should delete an existing monster', async () => {
      const id = '1';
      jest.spyOn(service, 'deleteMonster').mockResolvedValue();

      await resolver.deleteMonster(id);

      expect(service.deleteMonster).toHaveBeenCalledWith(id);
    });

    it('should return null if trying to delete a non-existing monster', async () => {
      const nonExistingId = 'nonExistingId';
      jest.spyOn(service, 'deleteMonster').mockResolvedValue(null);

      const result = await resolver.deleteMonster(nonExistingId);

      expect(result).toBeUndefined();
      expect(service.deleteMonster).toHaveBeenCalledWith(nonExistingId);
    });
  });
});
