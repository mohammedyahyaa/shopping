import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCardService } from '../services/shopping-card.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(private cartServ: ShoppingCardService) { }
  @Input('product') product: any = [];
  @Input('shoppingCart') shoppingCart: any = [];

  ngOnInit(): void {
  }

  addToCart() {
    this.cartServ.addToCart(this.product);
  }

  removeFromCart() {
    this.cartServ.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) { return 0; }

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }


}
