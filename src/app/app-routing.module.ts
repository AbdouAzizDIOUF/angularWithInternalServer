import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './component/products/products.component';
import {HomeComponent} from './component/home/home.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path:'', component: HomeComponent},
  {path:'home',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
