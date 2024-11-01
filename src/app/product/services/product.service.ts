import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface, ResponseProduct } from '../interface/product.interface';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private readonly http: HttpClient) {
  }

  public get(): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(environment.BASEURL);
  }

  public create(request: ProductInterface): Observable<ProductInterface> {
    return this.http.post<ProductInterface>(environment.BASEURL, request);
  }

  public update(request: ProductInterface): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${environment.BASEURL}/${request.id}`, request);
  }

  public delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.BASEURL}/${id}`);
  }

  public getById(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${environment.BASEURL}/${id}`);
  }

  public verificationId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.BASEURL}/verification/${id}`);
  }
}
