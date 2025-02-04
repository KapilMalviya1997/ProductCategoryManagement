import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../product-service.service';
import {  HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
    templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  totalProducts: number =0; 
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  searchTerm: string = '';
  currentUserRole: string = 'admin'; 
  Productnames : string ='';
  editedCategoryName :string ='';
  editedCategoryID :number=0;
  AllCategories:any[]=[];
  selectedCategory:number=0;
  Price:number=0;
  Quantity:number=0;
  ProductName:string='';
  Description:string='';
  editedProductID :number=0;
  loading:boolean=false;
  
   
  constructor(private productservice: ProductServiceService ) {}
  
  ngOnInit(): void {
    this.loadProducts();
    
  }

  loadProducts():void {
    this.loading = true;
    if (this.productservice) {
      this.productservice.getProducts(this.currentPage,this.pageSize).subscribe(
        (data) => {
          console.log("a",data);
          if (data != null && data != undefined) {
            this.products = data.items;
            this.loading = false;
            this.totalPages=data.totalRecords;
            console.log("bbb",data);
          } 
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      console.error('productsService is not defined');
    }
        
  }

 GetGategories()
 {
  this.loading=true;
    this.productservice.getCategories().subscribe((x)=>
    {
      if(x != null && x != undefined)
      {
          this.AllCategories=x;
          this.loading=false;
      }
    });
 }

  onSearch(serachitem:any) {
    
    this.loading=true;
    if(serachitem != null && serachitem !=undefined && serachitem !='')
    {
      this.productservice.SearchProduct(serachitem).subscribe((x)=>{
        if(x != null && x != undefined)
        {
          this.products=x;
          this.loading=false;
        }
        
      })
    }
    else{
        this.loadProducts();
    }
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.loadProducts(); 
  }

 
  addProduct() {
    this.loading=true;
    if( this.ProductName != null &&  this.ProductName != undefined && this.Price >0 && this.Quantity >0 && this.selectedCategory != null && this.selectedCategory != undefined)
    {
      const addcat:any={
        
          "name":this.ProductName ,
          "description": this.Description,
          "price": this.Price,
          "quantity": this.Quantity,
          "createdAt": Date,
          "updatedAt": Date,
          "categoryId": this.selectedCategory
      }
        this.productservice.AddProduct(addcat).subscribe(
          (x) => {
            this.loading=false;
          }
          
      );
      alert("Added Successfully.")
      window.location.reload();
    }
    else{
      alert("Please fill all details.");
    }
  }

  edit(id :number) {
    debugger
     if(id != null && id != undefined)
     {
       this.editedProductID = id;
       this.GetGategories();
       this.onSearch(this.editedProductID);
       this.ProductName=this.products[0].name;
       this.Price=this.products[0].price;
       this.Quantity=this.products[0].quantity;
       this.Description=this.products[0].description;
       this.selectedCategory=this.products[0].categoryId;
     }
   }
  editProduct() {
    this.loading=true;
    if(this.editedCategoryName != null && this.editedCategoryName != undefined && this.editedCategoryID != null && this.editedCategoryID != undefined)
    {
        let data :any=
          {
              "ProductId":this.editedProductID,
              "name": this.ProductName ,
              "description": this.Description,
              "price": this.Price,
              "quantity": this.Quantity,
              "categoryId": this.selectedCategory
          }
        

      this.productservice.EditProduct(data).subscribe((x)=>
     {
      this.loading=false;
     });
     alert("Updated successfully.");
         window.location.reload();
    }
  }

  deleteProduct(id: number) {
    this.loading=true;
        if(id != null && id != undefined )
      {
        this.productservice.DeleteProduct(id).subscribe((x)=>
        {
          this.loading=false;
        });
        alert("Deleted successfully.");
          window.location.reload();
      }
  }
}