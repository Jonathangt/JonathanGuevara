import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { ProductInterface, ResponseProduct } from '../interface/product.interface';
import { environment } from '../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const dummyProducts: ResponseProduct = {
      data: []
    };

    service.get().subscribe((products) => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${environment.BASEURL}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should create a product', () => {
    const newProduct: ProductInterface = {
      id: '1',
      name: 'Test Product',
      description: 'Test',
      logo: 'test.png',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.create(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${environment.BASEURL}`);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct: ProductInterface = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated',
      logo: 'updated.png',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.update(updatedProduct).subscribe((response) => {
      expect(response).toEqual({ message: 'Product updated successfully' });
    });

    const req = httpMock.expectOne(`${environment.BASEURL}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Product updated successfully' });
  });

  it('should delete a product', () => {
    const id = '1';

    service.delete(id).subscribe((response) => {
      expect(response).toEqual({ message: 'Product deleted successfully' });
    });

    const req = httpMock.expectOne(`${environment.BASEURL}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Product deleted successfully' });
  });

  it('should get a product by id', () => {
    const id = '1';
    const dummyProduct: ProductInterface = {
      id: '1',
      name: 'Test Product',
      description: 'Test',
      logo: 'test.png',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.getById(id).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(`${environment.BASEURL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should verify if an ID exists', () => {
    const id = '1';

    service.verificationId(id).subscribe((exists) => {
      expect(exists).toBe(true);
    });

    const req = httpMock.expectOne(`${environment.BASEURL}/verification/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });
});
