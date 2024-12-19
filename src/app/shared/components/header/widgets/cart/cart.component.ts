import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../../../../store/state/cart.state';
import { Observable } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';
import { SettingState } from '../../../../store/state/setting.state';
import { Values } from '../../../../interface/setting.interface';
import { Option } from '../../../../interface/theme-option.interface';
import { CartService } from '../../../../services/cart.service';
import { ClearCart, DeleteCart, ToggleSidebarCart, UpdateCart } from '../../../../store/action/cart.action';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VariationModalComponent } from '../../../widgets/modal/variation-modal/variation-modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencySymbolPipe, TranslateModule,
            RouterModule,ButtonComponent, VariationModalComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(CartState.cartTotal) cartTotal$: Observable<number>;
  @Select(CartState.sidebarCartOpen) sidebarCartOpen$: Observable<boolean>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(SettingState.setting) setting$: Observable<Values>;

  @Input() style: string = 'basic';

  public cartStyle: string = 'cart_sidebar';
  public cart: string;
  public shippingFreeAmt: number = 0;
  public cartTotal: number = 0;
  public shippingCal: number = 0;
  public confettiItems = Array.from({ length: 150 }, (_, index) => index);
  public confetti: number = 0;
  public loader: boolean = false;
  public width: number;

  constructor(private store: Store, public cartService: CartService, private modal: NgbModal) {
    this.themeOption$.subscribe((option) => {
      this.cartStyle = option?.general?.cart_style
      this.cart = this.cartStyle;
    });

    // Calculation
    this.cartTotal$.subscribe(total => {
      this.setting$.subscribe(setting => this.shippingFreeAmt = setting?.general?.min_order_free_shipping);
      this.cartTotal = total;
      this.shippingCal = (this.cartTotal * 100) / this.shippingFreeAmt;
      if(this.shippingCal > 100) {
        this.shippingCal = 100;
        if(this.confetti == 0) {
          this.confetti = 1;
          setTimeout(() => {
            this.confetti = 2;
          }, 4500);
        }
      } else {
        this.confetti = 0;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    if(this.cartStyle == 'cart_mini'){
      if(event.target.innerWidth <= 767){
       this.cart = 'cart_sidebar';
      }else if(event.target.innerWidth > 767){
        this.cart = 'cart_mini'
      }
    }
  }

  cartToggle(value: boolean) {
    this.store.dispatch(new ToggleSidebarCart(value));
  }

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item?.id,
      product_id: item?.product?.id,
      product: item?.product ? item?.product : null,
      variation_id: item?.variation_id ? item?.variation_id : null,
      variation: item?.variation ? item?.variation : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
    this.cartService.updateQty();
  }

  delete(id: number) {
    this.store.dispatch(new DeleteCart(id));
  }

  clearCart(){
    this.store.dispatch(new ClearCart());
  }

  openVariationModal(item: Cart){
    const modal = this.modal.open(VariationModalComponent, { centered: true, windowClass: 'theme-modal-2 variation-modal' })
    modal.componentInstance.variation = item;
  }

}
