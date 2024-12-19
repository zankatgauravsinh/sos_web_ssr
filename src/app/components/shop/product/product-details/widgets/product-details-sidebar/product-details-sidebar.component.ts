import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../../../shared/store/state/theme-option.state';
import { ProductBrandFilterComponent } from './product-brand-filter/product-brand-filter.component';
import { TrendingProductComponent } from '../trending-product/trending-product.component';
import { ProductService } from '../../../../../../shared/services/product.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProductSidebarServicesComponent } from './product-sidebar-services/product-sidebar-services.component';
import { SkeletonProductSidebarComponent } from './skeleton-product-sidebar/skeleton-product-sidebar.component';
import { BrandState } from '../../../../../../shared/store/state/brand.state';
import { Brand } from '../../../../../../shared/interface/brand.interface';
import { GetBrands } from '../../../../../../shared/store/action/brand.action';
import { BrandService } from '../../../../../../shared/services/brand.service';

@Component({
  selector: 'app-product-details-sidebar',
  standalone: true,
  imports: [CommonModule, NgbModule, TranslateModule,
            ProductBrandFilterComponent, TrendingProductComponent,
            ProductSidebarServicesComponent, SkeletonProductSidebarComponent],
  templateUrl: './product-details-sidebar.component.html',
  styleUrl: './product-details-sidebar.component.scss'
})
export class ProductDetailsSidebarComponent {

  @Select(ThemeOptionState.themeOptions) themeOptions$: Observable<Option>;
  @Select(BrandState.brand) brand$: Observable<Brand>;

  @Input() product: Product;

  public brands: Brand[];
  
  constructor(
    private productService: ProductService, 
    public brandService: BrandService, 
    private store: Store){}

  ngOnInit(){
    this.store.dispatch(new GetBrands({
      status: 1,
    })).subscribe({
    next: (value) => {
      this.brands = value.brand.brand.data;
    }
  });
  }
  
  closeFilter(){
    this.productService.productFilter = false;
  }
}
