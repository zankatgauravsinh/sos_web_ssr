import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from '../../../../../../shared/store/state/product.state';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';

@Component({
  selector: 'app-trending-product',
  standalone: true,
  imports: [CommonModule, TranslateModule, ProductBoxComponent],
  templateUrl: './trending-product.component.html',
  styleUrl: './trending-product.component.scss'
})
export class TrendingProductComponent {

  @Select(ProductState.relatedProducts) relatedProduct$: Observable<Product[]>;

  public relatedProducts: Product[] = [];

  ngOnInit() {
    this.relatedProduct$.subscribe(products => {
      this.relatedProducts = products?.length ? products?.filter(product => product?.is_trending) : [];
    });
  }
}
