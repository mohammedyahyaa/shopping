import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../model/IshoppingCart';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor(private db: AngularFireDatabase) { }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  public async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartID = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartID);
  }



  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result: any = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }


  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product) {
    this.updateToCart(product, 1);
  }

  async removeFromCart(product) {
    this.updateToCart(product, -1);
  }

  async updateToCart(product, quantityChange) {
    let cardid = await this.getOrCreateCartId();
    let item$: any = this.getItem(cardid, product.key);
    console.log(`ok` + product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists()) {
        item$.update({ quantity: item.payload.val().quantity + quantityChange });
      }
      else {
        item$.update({
          product: {
            title: product.payload.val().title,
            price: product.payload.val().price,
            category: product.payload.val().category,
            imageUrl: product.payload.val().imageUrl
          }
          , quantity: 0
        });
      }
    });
  }



}
