import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CarouselComponent, CarouselModule, SlidesOutputData } from 'ngx-owl-carousel-o';
import * as data from '../../../../../shared/data/owl-carousel';
import { Product, Variation } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { ProductService } from '../../../../../shared/services/product.service';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductBundleComponent } from '../widgets/product-bundle/product-bundle.component';
import { ProductContentComponent } from '../widgets/product-content/product-content.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { ProductDetailsSidebarComponent } from '../widgets/product-details-sidebar/product-details-sidebar.component';
import { ProductDetailsTabComponent } from '../widgets/product-details-tab/product-details-tab.component';
import { ProductDetailsComponent } from '../widgets/product-details/product-details.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';
import { ProductSocialShareComponent } from '../widgets/product-social-share/product-social-share.component';
import { ProductDigitalOptionsComponent } from '../widgets/product-digital-options/product-digital-options.component';
@Component({
  selector: 'app-product-sidebar-left',
  standalone: true,
  imports: [CommonModule, CarouselModule, NgxImageZoomModule, TranslateModule,
            ProductContentComponent, ProductInformationComponent, ProductDeliveryInformationComponent,
            ProductSocialShareComponent, PaymentOptionComponent, ProductBundleComponent,
            ProductDetailsTabComponent, ProductDetailsSidebarComponent, ProductDetailsComponent,
            ProductDigitalOptionsComponent],
  templateUrl: './product-sidebar-left.component.html',
  styleUrl: './product-sidebar-left.component.scss'
})
export class ProductSidebarLeftComponent {

  @Input() product: Product;
  @Input() option: Option | null;
  @Input() layout: string;

  @ViewChild('thumbnailCarousel') thumbnailCarousel: CarouselComponent;

  public selectedVariation: Variation;
  public activeSlide: string = '0';
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
  public isBrowser: boolean;

  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;

  constructor(public productService: ProductService,private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object,
    public route: ActivatedRoute){
    this.isBrowser = isPlatformBrowser(this.platformId)
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.activeSlide = '0'
      }
    });
  }

  selectedVariant(variant: Variation){
    this.selectedVariation = variant;
  }

  onCarouselLoad(){
    this.activeSlide = '0';
  }

  onSlideChange(event: SlidesOutputData) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!event || !event.slides || event.slides.length === 0 || !event.slides[0]?.id) {
      return;
    }

    const slideId = event.slides[0].id;
    if (this.selectedVariation && this.selectedVariation.variation_galleries.length) {
      const matchingImage = this.selectedVariation.variation_galleries.find((images) => images.id.toString() === slideId);
      
      if (matchingImage) {
        this.activeSlide = matchingImage.id.toString();
        this.thumbnailCarousel.to(this.activeSlide);
      } 
    } else {
      this.activeSlide = slideId;
      this.thumbnailCarousel.to(this.activeSlide);
    }
  }
}
