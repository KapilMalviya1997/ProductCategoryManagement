import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryServiceService } from '../category-service.service';
import {  HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  Categories: any[] = [];
  searchTerm: string = '';
  currentUserRole: string = 'admin'; 
  categorynames: string ='';
  editedCategoryName:string='';
  editedCategoryID:number=0;
  loading:boolean=false;
  constructor(private categoryService: CategoryServiceService,private router: Router) { }

  
  ngOnInit(): void {
    this.loadCategories();
    
  }

  
  loadCategories(): void {
    this.loading=true;
    if (this.categoryService) {
      this.categoryService.getCategories().subscribe(
        (data) => {
          if (data != null && data != undefined) {
            this.Categories = data;
            this.loading=false;
          } 
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
    } else {
      console.error('CategoryService is not defined');
    }
  }
  
  onSearch(serachitem:any) {
    this.loading=true;
    if(serachitem != null && serachitem !=undefined && serachitem !='')
    {
      this.categoryService.SearchCategory(serachitem).subscribe((x)=>{
        if(x != null && x != undefined)
        {
          this.Categories=x;
          this.loading=false;
        }
        
      })
    }
    else{
this.loadCategories();
    }
  }


  addCategory() 
  {

    this.loading=true;
    if( this.categorynames != null &&  this.categorynames != undefined)
    {
      const addcat:any={
        
          "name": this.categorynames,
          "createdAt": Date.now,
          "updatedAt": Date.now,
          "products": [
          ]
      }
        this.categoryService.Addcategory(addcat).subscribe(
          (x) => {
            var res=x;
            console.log("resAdd",res);
            this.loading=false;
          }
          
      );
      alert("Added Successfully.")
      window.location.reload();
    }
    else{
      alert("Please fill category.");
    }
  }

  edit(id: number, obj: any) {
   debugger
    if(id != null && id != undefined && obj != null && obj != undefined)
    {
      this.editedCategoryName=obj;
      this.editedCategoryID = id;
    }
  }
  EditCategory() {
    debugger
    this.loading=true;
     if(this.editedCategoryName != null && this.editedCategoryName != undefined && this.editedCategoryID != null && this.editedCategoryID != undefined)
     {
       this.categoryService.Editcategory(this.editedCategoryID,this.editedCategoryName).subscribe((x)=>
      {
        this.loading=false;
      });
      alert("Updated successfully.");
          window.location.reload();
     }
   }
  deleteCategory(id:number) {
    this.loading=true;
    if(id != null && id != undefined )
      {
        this.categoryService.Deletecategory(id).subscribe((x)=>
        {
          this.loading=false;
        });
        alert("Deleted successfully.");
          window.location.reload();
      }
  }
  Home()
    {
      debugger
      this.router.navigate(['/home']);
    }
}
