import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  products: Product[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  constructor(private productService: ProductService, private authService: AuthService, private _snackBar: MatSnackBar, private router:Router) {}

  ngOnInit() {
    // Fetch the list of products when the component initializes.
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      // Assign the fetched data to the MatTableDataSource
      this.dataSource.data = data;    
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  addProduct() {
    this.router.navigate(['admin/add-update-product/',0]);
  }

  editProduct(product: Product) {
    this.router.navigate(['admin/add-update-product/',product]);
  }

  deleteProduct(productId: number) {
    // Implement logic to delete a product and refresh the product list.
    this.productService.deleteProduct(productId).subscribe((categories:any) => {
      this._snackBar.open('Product deleted successfully', 'X');
      this.fetchProducts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  logout() {
    this.authService.logout();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
