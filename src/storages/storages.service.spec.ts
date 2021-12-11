import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storages.service';
import { StorageRepository } from './storages.repository';
import { NotFoundException } from '@nestjs/common';

describe('StorageService', () => {
  let storagesService;
  let storagesRepository;

  const mockStorageRepository = () => ({
    saveStorage: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: StorageRepository,
          useFactory: mockStorageRepository,
        },
      ],
    }).compile();
    storagesService = await module.get<StorageService>(StorageService);
    storagesRepository = await module.get<StorageRepository>(StorageRepository);
  });

  describe('createStorage', () => {
    it('should save a storages in the database', async () => {
      storagesRepository.saveStorage.mockResolvedValue('someStorage');
      expect(storagesRepository.saveStorage).not.toHaveBeenCalled();
      
      const createStorageDto = {
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      }	;
      
      const result = await storagesService.save(createStorageDto);
     
      expect(storagesRepository.saveStorage).toHaveBeenCalledWith(createStorageDto);
      expect(result).toEqual('someStorage');
    });
  });

  describe('getStorages', () => {
    it('should get all storages', async () => {
      storagesRepository.find.mockResolvedValue('someStorages');
      expect(storagesRepository.find).not.toHaveBeenCalled();
      const result = await storagesService.getAll();
      expect(storagesRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someStorages');
    });
  });

  describe('getStorage', () => {
    it('should retrieve a storages with an ID', async () => {
      const mockStorage = {
        id: 1,
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      };

      storagesRepository.findOne.mockResolvedValue(mockStorage);
      
      const result = await storagesService.getOne(1);
      
      expect(result).toEqual(mockStorage);
      expect(storagesRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as a storages is not found', () => {
      storagesRepository.findOne.mockResolvedValue(null);
      expect(storagesService.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteStorage', () => {
    it('should delete storages', async () => {
      storagesRepository.delete.mockResolvedValue(1);
      expect(storagesRepository.delete).not.toHaveBeenCalled();
      await storagesService.delete(1);
      expect(storagesRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});