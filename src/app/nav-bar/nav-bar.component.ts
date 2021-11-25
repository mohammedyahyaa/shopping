import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCardService } from '../services/shopping-card.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  static SumValue(): number | undefined {
    throw new Error('Method not implemented.');
  }
  static counter(): number | undefined {
    throw new Error('Method not implemented.');
  }

  shoppingCartCounter = 0;
  counterSender = 0;
  constructor(private shoppingCartServ: ShoppingCardService, public service: AuthService, private db: AngularFireDatabase) {



    this.service.AppUser$;
    // console.log(this.userApp.isAdmin);


  }


  login() { this.service.login(); }
  async ngOnInit() {
    let cart$ = (await this.shoppingCartServ.getCart());
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartCounter = 0;
      for (let productID in cart?.items) {

        this.shoppingCartCounter += cart?.items[productID].quantity;
      }


      console.log(this.shoppingCartCounter);
    })


  }


  logout() {

    this.service.logout();

  }





}



