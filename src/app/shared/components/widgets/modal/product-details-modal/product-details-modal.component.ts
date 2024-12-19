import { Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CarouselComponent, CarouselModule, SlidesOutputData } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '../../button/button.component';
import { VariantAttributesComponent } from '../../variant-attributes/variant-attributes.component';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../../../../store/state/cart.state';
import { Observable } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { productMainThumbSlider, productThumbSlider } from '../../../../data/owl-carousel';
import { AddToCart } from '../../../../store/action/cart.action';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { ProductInformationComponent } from '../../../../../components/shop/product/product-details/widgets/product-information/product-information.component';
import { ProductDetailsComponent } from '../../../../../components/shop/product/product-details/widgets/product-details/product-details.component';
import { ProductContentComponent } from '../../../../../components/shop/product/product-details/widgets/product-content/product-content.component';
import { ProductWholesalesComponent } from '../../../../../components/shop/product/product-details/widgets/product-wholesales/product-wholesales.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductDeliveryInformationComponent } from '../../../../../components/shop/product/product-details/widgets/product-delivery-information/product-delivery-information.component';

@Component({
  selector: 'app-product-details-modal',
  standalone: true,
  imports: [CommonModule, CarouselModule, TranslateModule, CurrencySymbolPipe,NgxImageZoomModule,
            NgbModule, ButtonComponent, VariantAttributesComponent,
            ProductDetailsComponent, ProductContentComponent, ProductInformationComponent,
            ProductWholesalesComponent, ProductDeliveryInformationComponent],
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.scss'
})

export class ProductDetailsModalComponent {

  @Input() product: Product;

  @ViewChild('thumbnailCarousel') thumbnailCarousel: CarouselComponent;

  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;

  public modalOpen: boolean = false;
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  public videoType = ['mp4', 'mov', 'avi'];
  public audio = ['mpeg', 'wav', 'ogg', 'mp3']
  public cartItem: Cart | null;
  public productQty: number = 1;
  public selectedVariation: Variation;
  public totalPrice: number = 0;
  public activeSlide: string = '0';

  public productMainThumbSlider = productMainThumbSlider;
  public productThumbSlider = productThumbSlider;
  public isBrowser: boolean;

  constructor(public modal: NgbActiveModal,
    private store: Store, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.cartItem$.subscribe(items => {
      this.cartItem = items.find(item => item.product.id == this.product.id)!;
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  selectedVariant(variant: Variation){
    this.selectedVariation = variant;
  }

  onSlideChange(event: SlidesOutputData){
    if(this.thumbnailCarousel && event && event.slides && event.slides.length > 0){
     this.activeSlide = event.slides[0].id;

     if(this.activeSlide){
       this.thumbnailCarousel.to(this.activeSlide);
     }
   }
  }


  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
    this.wholesalePriceCal();
  }

  wholesalePriceCal() {
    let wholesale = this.product.wholesales.find(value => value.min_qty <= this.productQty && value.max_qty >= this.productQty) || null;
    if(wholesale && this.product.wholesale_price_type == 'fixed') {
      this.totalPrice = this.productQty * wholesale.value;
    } else if(wholesale && this.product.wholesale_price_type == 'percentage') {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
      this.totalPrice = this.totalPrice - (this.totalPrice * (wholesale.value / 100));
    } else {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
    }
  }

  addToCart(product: Product) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id!,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id! : null,
        quantity: this.productQty
      }
      this.store.dispatch(new AddToCart(params)).subscribe({
        complete: () => {
          this.modal.close();
        }
      });
    }
  }

  getImageContent(imageUrl: string): string {
    if(this.videoType.includes(imageUrl.substring(imageUrl.lastIndexOf('.') + 1))){
      return `<i class="ri-video-line"></i>`
    }else if(this.audio.includes(imageUrl.substring(imageUrl.lastIndexOf('.') + 1))){
      return `<i class="ri-headphone-line"></i>`;
    }else {
      return `<img src="${imageUrl}" class="img-fluid">`;
    }
  }

  externalProductLink(link: string) {
    if(link) {
      window.open(link, "_blank");
    }
  }
}
