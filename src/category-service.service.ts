import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private apiUrl = 'https://localhost:7132/api/Category/';

  constructor(private http: HttpClient) { }
  
  getCategories(): Observable<any> {
    
    return this.http.get<any>(this.apiUrl+ 'GetAllCategories');
  }

  SearchCategory(data:any)
  {debugger
    return this.http.get<any>(this.apiUrl+ 'GetCategory' + '?name=' + data);
  }

  Addcategory(data:any)
  {
    
    return this.http.post(this.apiUrl +'AddCategory', data);
  }
  Editcategory( id:number,data:any)
  {
    return this.http.get(this.apiUrl + 'EditCategory' + '?id='+id +'&category='+ data);
  }
  Deletecategory(id:number)
  {
    debugger
    return this.http.delete(this.apiUrl +'DeleteCategory' + '?CategoryId=' + id);
  }

}
