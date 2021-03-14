import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  formGroup: any;
  submitted: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fb:FormBuilder,
              private router: Router,
              ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
   //f(id == null) this.router.navigate(['/error404'])
    this.productService.getProductById(id).subscribe(product => {
      console.log(product.id)
      this.formGroup = this.fb.group({
        id:[product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required]
      })
    })
  }

  onEditProduct() {
    this.submitted = true;
    if (this.formGroup.invalid) return;
    this.productService.edit(this.formGroup.value).subscribe(product => {
      alert(this.formGroup.invalid);
    })
  }
}
