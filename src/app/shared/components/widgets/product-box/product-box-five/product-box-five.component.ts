import { Component, Input } from '@angular/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { RouterModule } from '@angular/router';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { DisplayVariantAttributesComponent } from '../../display-variant-attributes/display-variant-attributes.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-box-five',
  standalone: true,
  imports: [CommonModule, CurrencySymbolPipe, RouterModule, TranslateModule,
            ProductCartButtonComponent, ProductHoverActionComponent,
            DisplayVariantAttributesComponent, WishlistComponent,
            CartButtonComponent, ProductBoxImageVariantComponent, NgbRating],
  templateUrl: './product-box-five.component.html',
  styleUrl: './product-box-five.component.scss'
})
export class ProductBoxFiveComponent {

  @Input() product: Product;

  public selectedVariation: Variation;

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
      // this.selectedVariant.emit(this.selectedVariation);
    }
  }
}
