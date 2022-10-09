import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CartPageModule } from './components/cart-page/cart-page.module';
import { CatalogModule } from './components/catalog/catalog.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { AppRoutingModule } from './router/app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CatalogModule,
    ToolbarModule,
    HttpClientModule,
    CartPageModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
