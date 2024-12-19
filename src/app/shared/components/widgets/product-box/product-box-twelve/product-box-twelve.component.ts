import { Component, Input } from '@angular/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxVariantAttributesComponent } from '../widgets/product-box-variant-attributes/product-box-variant-attributes.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

@Component({
  selector: 'app-product-box-twelve',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule,
            CurrencySymbolPipe, ProductCartButtonComponent, ProductHoverActionComponent,
            TranslateModule, ProductBoxVariantAttributesComponent, ProductBoxImageVariantComponent, CartButtonComponent],
  templateUrl: './product-box-twelve.component.html',
  styleUrl: './product-box-twelve.component.scss'
})
export class ProductBoxTwelveComponent {

  @Input() product: Product;

  public selectedVariation: Variation;

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
    }
  }

}
