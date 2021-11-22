import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: any[] = [];
  filterdProducts: any[] = [];
  category: any = '';
  subscribtion: Subscription;

  constructor(private route: ActivatedRoute, private productServ: ProductsService, private categoriesServ: CategoriesService) {

    this.subscribtion =
      this.productServ.getAll().pipe(switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }))
        .subscribe(params => {
          this.category = params.get('category');
          this.filterdProducts = (this.category) ?
            this.products.filter(p => p.payload.val().category === this.category) : this.products;
        })


  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  ngOnInit() {


  }

}
