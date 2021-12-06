import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let productService;
  let productRepository;

  const mockProductRepository = () => ({
    saveProduct: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useFactory: mockProductRepository,
        },
      ],
    }).compile();
    productService = await module.get<ProductService>(ProductService);
    productRepository = await module.get<ProductRepository>(ProductRepository);
  });

  describe('createProduct', () => {
    it('should save a product in the database', async () => {
      productRepository.saveProduct.mockResolvedValue('someProduct');
      expect(productRepository.saveProduct).not.toHaveBeenCalled();
      
      const createProductDto = {
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      }	;
      
      const result = await productService.save(createProductDto);
     
      expect(productRepository.saveProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual('someProduct');
    });
  });

  describe('getProducts', () => {
    it('should get all products', async () => {
      productRepository.find.mockResolvedValue('someProducts');
      expect(productRepository.find).not.toHaveBeenCalled();
      const result = await productService.getAll();
      expect(productRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someProducts');
    });
  });

  describe('getProduct', () => {
    it('should retrieve a product with an ID', async () => {
      const mockProduct = {
        id: 1,
        name: "Blusa de Manga Longa",
        description: "uma peça de roupa bem casual",
        unitPrice: 15.75
      };

      productRepository.findOne.mockResolvedValue(mockProduct);
      
      const result = await productService.getOne(1);
      
      expect(result).toEqual(mockProduct);
      expect(productRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as a product is not found', () => {
      productRepository.findOne.mockResolvedValue(null);
      expect(productService.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', async () => {
      productRepository.delete.mockResolvedValue(1);
      expect(productRepository.delete).not.toHaveBeenCalled();
      await productService.delete(1);
      expect(productRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});