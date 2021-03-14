import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product';
import {ActionEvent, ProductActionsTypes} from '../../../../state/data.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product?:Product;
  @Output() eventEmitter:EventEmitter<ActionEvent<ProductActionsTypes>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT, payload:p});
  }

  onEditProduct(p: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT, payload:p});
  }

  onDeleteProduct(p: Product) {
    this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT, payload:p});
  }
}
