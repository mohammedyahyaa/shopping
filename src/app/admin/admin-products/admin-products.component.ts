import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, OnInit {

  products: any;
  filteredProduct: any;
  subscribe: Subscription | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productServ: ProductsService) {
    this.subscribe = this.productServ.getAll().subscribe(products => {

      this.filteredProduct = this.products = products
      this.dtTrigger.next();
    }

    );
  }


  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }



  filter(query: string) {

    if (query) {
      this.filteredProduct =
        this.products.filter(
          p => p.payload.val().title.toLowerCase().includes(query.toLocaleLowerCase()));
    }
    else {
      this.filteredProduct = this.products;
    }
  }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }


}
