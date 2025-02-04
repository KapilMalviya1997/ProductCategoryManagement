import { Routes } from '@angular/router';
import path from 'node:path';
import { LoginComponent } from '../login/login.component';

import { HomeComponent } from '../home/home.component';
import { CategoryComponent } from '../category/category.component';
import { ProductComponent } from '../product/product.component';
export const routes: Routes = [

    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'category',component:CategoryComponent},
    {path:'product',component:ProductComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
