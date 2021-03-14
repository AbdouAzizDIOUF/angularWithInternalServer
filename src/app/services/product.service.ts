import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../model/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host=environment.host;

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"products");
  }

  getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"products?selected=true");
  }

  getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"products?available=true");
  }

  getSearchProducts(keyword: any):Observable<Product[]> {
    return this.http.get<Product[]>(this.host+"products?name_like="+keyword);
  }

  selected(product:Product):Observable<Product>{
    product.selected = !product.selected;
    return this.http.put<Product>(this.host+"products/"+product.id, product);
  }

  delete(p: Product):Observable<void> {
    return this.http.delete<void>(this.host+"products/"+p.id);
  }

  save(p: Product):Observable<Product> {
    return this.http.post<Product>(this.host+"products/", p);
  }

  getProductById(id: number):Observable<Product>{
    return this.http.get<Product>(this.host+"products/"+id);
  }

  edit(p: Product):Observable<Product> {
    return this.http.put<Product>(this.host+"products/"+p.id, p);
  }
}
