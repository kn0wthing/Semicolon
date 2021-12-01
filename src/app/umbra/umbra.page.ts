import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-umbra',
  templateUrl: './umbra.page.html',
  styleUrls: ['./umbra.page.scss'],
})
export class UmbraPage implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit() {
  }

  public getCartCount() : number {
    // to show count of cart items on footer cart icon
    return this.productService.getCartCount();
  }

}
