import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './services/admin-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'user', 
  component: UserComponent,
  canActivate: [AdminGuard]
 },
  {
    path: 'admin',
    component: AdminComponent, // Your admin component
    canActivate: [AdminGuard] // Protect this route with AdminGuard
  },
  {
    path: 'admin/add-update-product/:id',
    component: AddUpdateProductComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
