import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]> | undefined;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$=this.productService.getAllProducts();
  }
}
