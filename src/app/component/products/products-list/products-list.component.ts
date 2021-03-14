import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from '../../../state/data.state';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$!: Observable<AppDataState<Product[]>>;

  @Output() eventEmitter:EventEmitter<ActionEvent<ProductActionsTypes>> = new EventEmitter();

  readonly DataStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onActionEvent($event: ActionEvent<ProductActionsTypes>) {
    this.eventEmitter.emit($event)
  }
}
