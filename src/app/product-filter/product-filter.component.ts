import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;


  constructor(private categoryServ: CategoriesService) {
    this.categories$ = this.categoryServ.getCategories();
  }

  ngOnInit(): void {
  }

}
