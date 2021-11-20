import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: any = {};
  id;


  categories$;
  constructor(private activeRoute: ActivatedRoute, private catServ: CategoriesService,
    private productServ: ProductsService,
    private router: Router) {

    this.categories$ = catServ.getCategories();
    this.id = this.activeRoute.snapshot.paramMap.get('id');


    if (this.id) {

      console.log(this.id);
      this.productServ.getById(this.id).pipe(take(1)).subscribe(prod => {

        if (prod) {
          this.product = prod;
        }
      })

    }

  }

  ngOnInit() {
  }

  save(product) {

    if (this.id) {
      this.productServ.update(this.id, product);
    }

    else {
      this.productServ.create(product);
    }
    this.router.navigateByUrl('/admin/products');

  }

  delete() {

    if (confirm('Are You Sure You Want Delete The Product ? ')) {
      this.productServ.delete(this.id);
    }
    this.router.navigateByUrl('/admin/products');

  }




}
