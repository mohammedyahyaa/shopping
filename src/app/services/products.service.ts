import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }


  create(product) {
    this.db.list('/products').push(product);
  }


  getAll() {
    return this.db.list('/products').snapshotChanges();
  }

  getById(productID: string) {
    return this.db.object('/products/' + productID).valueChanges();

  }

  update(productID: string, product) {

    return this.db.object('/products/' + productID).update(product);
  }

  delete(productID: string) {

    return this.db.object('/products/' + productID).remove();
  }




}
