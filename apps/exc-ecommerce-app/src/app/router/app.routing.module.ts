import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CLI imports router

import { CartPageComponent } from '../components/cart-page/cart-page.component';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { AuthGuardGuard as AuthGuard } from './auth-guard.guard';

// AUTH Routes
// canActivate: [AuthGuard]
const appRoutes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
