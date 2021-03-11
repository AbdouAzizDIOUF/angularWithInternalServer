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
}
