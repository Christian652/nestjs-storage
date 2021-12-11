import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './settings.service';
import { SettingRepository } from './settings.repository';
import { NotFoundException } from '@nestjs/common';

describe('SettingService', () => {
  let settingsService;
  let settingsRepository;

  const mockSettingRepository = () => ({
    saveSetting: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        {
          provide: SettingRepository,
          useFactory: mockSettingRepository,
        },
      ],
    }).compile();
    settingsService = await module.get<SettingService>(SettingService);
    settingsRepository = await module.get<SettingRepository>(SettingRepository);
  });

  describe('createSetting', () => {
    it('should save a settings in the database', async () => {
      settingsRepository.saveSetting.mockResolvedValue('someSetting');
      expect(settingsRepository.saveSetting).not.toHaveBeenCalled();
      
      const createSettingDto = {
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      }	;
      
      const result = await settingsService.save(createSettingDto);
     
      expect(settingsRepository.saveSetting).toHaveBeenCalledWith(createSettingDto);
      expect(result).toEqual('someSetting');
    });
  });

  describe('getSettings', () => {
    it('should get all settings', async () => {
      settingsRepository.find.mockResolvedValue('someSettings');
      expect(settingsRepository.find).not.toHaveBeenCalled();
      const result = await settingsService.getAll();
      expect(settingsRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someSettings');
    });
  });

  describe('getSetting', () => {
    it('should retrieve a settings with an ID', async () => {
      const mockSetting = {
        id: 1,
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      };

      settingsRepository.findOne.mockResolvedValue(mockSetting);
      
      const result = await settingsService.getOne(1);
      
      expect(result).toEqual(mockSetting);
      expect(settingsRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as a settings is not found', () => {
      settingsRepository.findOne.mockResolvedValue(null);
      expect(settingsService.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteSetting', () => {
    it('should delete settings', async () => {
      settingsRepository.delete.mockResolvedValue(1);
      expect(settingsRepository.delete).not.toHaveBeenCalled();
      await settingsService.delete(1);
      expect(settingsRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});