import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCardService } from '../services/shopping-card.service';


@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  cart;
  constructor(private cartServ: ShoppingCardService) { }


  async ngOnInit(): Promise<void> {
    (await this.cartServ.getCart()).valueChanges().subscribe(cart => {
      this.cart = cart;
      console.log(this.cart);
    })
  }




}
