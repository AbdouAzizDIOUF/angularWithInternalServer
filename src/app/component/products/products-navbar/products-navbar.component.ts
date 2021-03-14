import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from '../../../state/data.state';

@Component({
  selector: 'app-products-navbar',
  templateUrl: './products-navbar.component.html',
  styleUrls: ['./products-navbar.component.css']
})
export class ProductsNavbarComponent implements OnInit {

  @Output() eventEmitter: EventEmitter<ActionEvent<ProductActionsTypes>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.eventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
      this.eventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS})
  }

  onGetAvailableProducts() {
      this.eventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS})
  }

  onNewProduct() {
      this.eventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT})
  }

  onSearch(dataForm: any) {
    this.eventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForm})
  }
}
