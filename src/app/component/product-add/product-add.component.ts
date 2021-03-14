import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  formGroup : any;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private productService:ProductService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    })
  }

  onSaveProduct(){
    this.submitted = true;
    if(this.formGroup.invalid) return;
    this.productService.save(this.formGroup.value).subscribe(data =>{
      console.log(data)
    })
  }
}
