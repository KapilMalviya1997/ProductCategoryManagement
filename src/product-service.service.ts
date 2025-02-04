import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

   private apiUrl = 'https://localhost:7132/api/Product/';
  
    constructor(private http: HttpClient) { }

    getProducts(skip:number,take:number): Observable<any> {
    
      return this.http.get<any>(this.apiUrl+ 'GetAllProducts' +'?pageNumber=' +skip +'&pageSize=' +take );
    }
    getCategories(): Observable<any> {
    
      return this.http.get<any>('https://localhost:7132/api/Category/GetAllCategories');
    }
  
    SearchProduct(data:any)
    {debugger
      return this.http.get<any>(this.apiUrl+ 'GetProduct' + '?name=' + data);
    }
  
    AddProduct(data:any)
    {debugger
      return this.http.post(this.apiUrl +'AddProduct', data);
    }
    EditProduct(data:any)
    {
      return this.http.put(this.apiUrl + 'EditProduct' , data);
    }
    DeleteProduct(id:number)
    {
      debugger
      return this.http.delete(this.apiUrl +'DeleteProduct' + '?productId=' + id);
    }
}
