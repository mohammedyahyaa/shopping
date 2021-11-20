import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = [];
  categories$: any = [];
  constructor(private productServ: ProductsService, private categoriesServ: CategoriesService) {
    this.categories$ = this.categoriesServ.getCategories();
    this.productServ.getAll().subscribe(product => this.products = product);
  }

  ngOnInit() {


  }

}
