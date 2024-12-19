import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { AddToWishlist, DeleteWishlist } from '../../../../store/action/wishlist.action';
import { QuickViewComponent } from '../widgets/product-hover-action/quick-view/quick-view.component';
import { DisplayVariantAttributesComponent } from '../../display-variant-attributes/display-variant-attributes.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { CompareComponent } from '../widgets/product-hover-action/compare/compare.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

@Component({
  selector: 'app-product-box-three',
  standalone: true,
  imports: [CommonModule, CurrencySymbolPipe, RouterModule,
            ProductCartButtonComponent, ProductHoverActionComponent, NgbRating,
            NgbModule, QuickViewComponent, DisplayVariantAttributesComponent,
            CartButtonComponent, CompareComponent, ProductBoxImageVariantComponent, WishlistComponent],
  templateUrl: './product-box-three.component.html',
  styleUrl: './product-box-three.component.scss'
})
export class ProductBoxThreeComponent {

  @Input() product: Product;

  public hoverImage: string;
  public selectedVariation: Variation;

  constructor(private store: Store){}

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
    }
  }

	ariaValueText(current: number, max: number) {
		return `${current} out of ${max} hearts`;
	}

  addToWishlist(product: Product){
    if(this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      product['is_wishlist'] = !product['is_wishlist'];
    }
    let action = product['is_wishlist'] === !!this.store.selectSnapshot(state => state.auth && state.auth.access_token) ? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }
}
