import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  categories: Category[] = [];
  products: Product[] = [];
  isLoading = true;
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = [];
  initialLoadCount = 10;
  loadMoreCount = 10;
  isFiltered = false;
  navItemColors = ['#512c83',' #ecaf81', '#60b8d4', '#3745b5'];
  currentCategory: String = 'All Products';

  // Scroll event listener
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Get the window height
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    // Check if the scroll position is near the bottom of the page
    if (scrollY + windowHeight >= document.body.scrollHeight) {
      // Load more products when reaching the bottom of the page
      this.loadMoreProducts();
    }
  }

  constructor(private http: HttpClient,private authService: AuthService, private productService:ProductService) { }

  ngOnInit() {
    this.getProductsCategories();
  }

  // Fetch categories and products from the API
  getProductsCategories(){
    this.productService.getCategories().subscribe((categories:any) => {
      this.categories = categories;
    });
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.displayedProducts = this.products.slice(0, this.initialLoadCount);
      this.isLoading = false;
    });
  }

  loadMoreProducts() {
    // Check if there are more products to load based on the current state
    if (this.isFiltered) {
      // In filtered state, load more from filtered products
      const startIndex = this.displayedProducts.length;
      const endIndex = startIndex + this.loadMoreCount;
      this.displayedProducts = this.displayedProducts.concat(this.filteredProducts.slice(startIndex, endIndex));
    } else {
      // In unfiltered state, load more from all products
      const startIndex = this.displayedProducts.length;
      const endIndex = startIndex + this.loadMoreCount;
      this.displayedProducts = this.displayedProducts.concat(this.products.slice(startIndex, endIndex));
    }
  }

  filterProductsByCategory(category:any) {
    this.displayedProducts = [];
    this.isLoading = true;
    this.currentCategory = category;
    // Filter products by the selected category
    this.filteredProducts = this.products.filter(product => product.category === category);
    this.isFiltered = true;
    setTimeout(() => {
      this.displayedProducts = this.filteredProducts.slice(0, this.initialLoadCount); // Load initial products
      // Clear the loading flag when filtering is done
      this.isLoading = false;
    }, 1000);
  }

  resetFilter() {
    this.currentCategory = 'All Products';
    this.displayedProducts = [];
    this.isLoading = true;
    setTimeout(() => {
      this.displayedProducts = this.products;
      this.isLoading = false;
    }, 1000);
  }

  logout() {
    this.authService.logout();
  }
}
