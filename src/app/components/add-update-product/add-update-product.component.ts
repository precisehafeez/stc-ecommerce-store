import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent {
  formData: any = [];
  categories: Category[] = [];
  currentId: number = 0;
  constructor(private productService:ProductService, private _snackBar: MatSnackBar, private router: Router,private _activatedroute : ActivatedRoute,private authService: AuthService) { 
    this.currentId = Number(this._activatedroute.snapshot.paramMap.get('id'));
  }
  ngOnInit() {
    this.getCategories();
    if(this.currentId != 0)
      this.getProductById(this.currentId);
    else
      this.setModelData();
   
  }
  getErrorMessage() {
    return 'You must enter a value';
  }

  getProductById(id:number) {
    this.productService.getProductById(id).subscribe((resp:any) => {
      this.formData = resp;
    });
  }
  // Fetch categories from the API
  getCategories(){
    this.productService.getCategories().subscribe((categories:any) => {
      this.categories = categories;
    });
  }

  // Save product
  saveProduct(){
  this.productService.addProduct(this.formData).subscribe((resp:any) => {
    this._snackBar.open('Product Created/Updated successfully', 'X');
    this.router.navigate(['/admin']);
  });
  }

  // update product
  updateProduct(){
    this.productService.updateProduct(this.formData).subscribe((resp:any) => {
      this._snackBar.open('Product Created/Updated successfully', 'X');
      this.router.navigate(['/admin']);
    });
  }

  setModelData(){
    this.formData = {
      id: 0,
      price: null,
      description: null,
      image: null,
      title: null,
      category: null,
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // Logout user
  logout() {
    this.authService.logout();
  }
}
