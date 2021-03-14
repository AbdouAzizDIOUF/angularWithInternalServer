import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../state/data.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

 // products$: Observable<Product[]> | undefined;
  products$!: Observable<AppDataState<Product[]>>;
  // readonly: lecture seule
  readonly DataStateEnum=DataStateEnum;

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.onGetAllProducts();
  }

  onGetAllProducts() {
    this.products$=this.productService.getAllProducts().pipe(
      map(data => ({dataState:DataStateEnum.LOADED, data: data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(error => of({dataState:DataStateEnum.ERROR, errorMessage:error.message}))
    ) ;
  }

  onGetSelectedProducts() {
    this.products$=this.productService.getSelectedProducts().pipe(
      map(data => ({dataState:DataStateEnum.LOADED, data: data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(error =>of({dataState:DataStateEnum.ERROR, errorMessage:error.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$=this.productService.getAvailableProducts().pipe(
      map(data => ({dataState:DataStateEnum.LOADED, data: data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(error =>of({dataState:DataStateEnum.ERROR, errorMessage:error.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$=this.productService.getSearchProducts(dataForm.keyword).pipe(
      map(data => ({dataState:DataStateEnum.LOADED, data: data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(error =>of({dataState:DataStateEnum.ERROR, errorMessage:error.message}))
    );
  }

  onSelect(p: Product) {
    this.productService.selected(p).subscribe(
      (data)=>{
        p.selected = data.selected;
      })
  }

  onDeleteProduct(p: Product) {
    let v = confirm("Etes-vous vraiment sur ?")
    if (v) {
      this.productService.delete(p).subscribe(data => {
        this.onGetAllProducts();
      })
    }
  }

  onNewProduct() {
    return this.router.navigateByUrl('/newProduct');
  }

  onEditProduct(p: Product) {
    return this.router.navigateByUrl('/editProduct/'+p.id);
  }

  onActionEvent($event: ActionEvent<ProductActionsTypes>) {
    switch($event.type)
    {
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct(); break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEditProduct($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDeleteProduct($event.payload); break;
    }
  }
}
