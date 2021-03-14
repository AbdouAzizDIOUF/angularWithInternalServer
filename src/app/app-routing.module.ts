import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './component/products/products.component';
import {HomeComponent} from './component/home/home.component';
import {ProductAddComponent} from './component/product-add/product-add.component';
import {ProductEditComponent} from './component/product-edit/product-edit.component';
import {Error404Component} from './component/error404/error404.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path:'', component: HomeComponent},
  {path:'home',redirectTo:''},
  {path:'newProduct', component:ProductAddComponent},
  {path:'editProduct/:id', component:ProductEditComponent},
  //{path:'error404', component:Error404Component},
  {path:'**', component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
