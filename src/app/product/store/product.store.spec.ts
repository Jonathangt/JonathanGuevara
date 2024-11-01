import { TestBed } from '@angular/core/testing';
import { ProductStore } from './product.store';
import { ProductInterface } from '../interface/product.interface';

describe('ProductStore', () => {
  // @ts-ignore
  let store: ProductStore;

  const mockProducts: ProductInterface[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2025-01-01'),
      logo: 'logo1.png'
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      date_release: new Date('2024-02-01'),
      date_revision: new Date('2025-02-01'),
      logo: 'logo2.png'
    },
    {
      id: '3',
      name: 'Test Product',
      description: 'Description 3',
      date_release: new Date('2024-03-01'),
      date_revision: new Date('2025-03-01'),
      logo: 'logo3.png'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductStore]
    });
    store = TestBed.inject(ProductStore);
  });

  describe('Initial State', () => {
    it('should have empty products array initially', () => {
      expect(store.products()).toEqual([]);
    });

    it('should have undefined filterTerm initially', () => {
      expect(store.filterTerm()).toBeUndefined();
    });

    it('should have default itemsPerPage value', () => {
      expect(store.itemsPerPage()).toBe(5);
    });
  });

  describe('addProduct', () => {
    it('should add products to the store', () => {
      store.addProduct(mockProducts);
      expect(store.products()).toEqual(mockProducts);
    });

    it('should append new products to existing ones', () => {
      const newProduct: ProductInterface = {
        id: '4',
        name: 'New Product',
        description: 'New Description',
        date_release: new Date('2024-04-01'),
        date_revision: new Date('2025-04-01'),
        logo: 'logo4.png'
      };

      store.addProduct(mockProducts);
      store.addProduct([newProduct]);

      expect(store.products().length).toBe(4);
      expect(store.products()).toContainEqual(newProduct);
    });
  });

  describe('removeItem', () => {
    beforeEach(() => {
      store.addProduct(mockProducts);
    });

    it('should remove product by id', () => {
      store.removeItem('1');
      expect(store.products().length).toBe(2);
      expect(store.products().find((p: ProductInterface) => p.id === '1')).toBeUndefined();
    });

    it('should not modify store if id does not exist', () => {
      store.removeItem('non-existent-id');
      expect(store.products().length).toBe(3);
    });
  });

  describe('filtering', () => {
    beforeEach(() => {
      store.addProduct(mockProducts);
    });

    it('should set filter term', () => {
      store.setFilterTerm('test');
      expect(store.filterTerm()).toBe('test');
    });

  });

  describe('pagination', () => {
    beforeEach(() => {
      store.addProduct(mockProducts);
    });

    it('should set items per page', () => {
      store.setItemsPerPage(2);
      expect(store.itemsPerPage()).toBe(2);
    });
  });

});
