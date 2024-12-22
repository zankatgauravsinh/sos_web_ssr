import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { Select, Store } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { BackToTopComponent } from '../shared/components/widgets/back-to-top/back-to-top.component';
import { LoaderComponent } from '../shared/components/widgets/loader/loader.component';
import { ThemeOptionService } from '../shared/services/theme-option.service';
import { GetMenu } from '../shared/store/action/menu.action';
import { ThemeOptions } from '../shared/store/action/theme-option.action';
import { ThemeOptionState } from '../shared/store/state/theme-option.state';
import { NewsletterModalComponent } from '../shared/components/widgets/modal/newsletter-modal/newsletter-modal.component';
import { Option } from '../shared/interface/theme-option.interface';
import { GetCategories } from '../shared/store/action/category.action';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,LoaderComponent,HeaderComponent, RouterModule,LoadingBarRouterModule ,
            BackToTopComponent, NewsletterModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;
  @Select(ThemeOptionState.cookies) cookies$: Observable<boolean>;
  @Select(ThemeOptionState.exit) exit$: Observable<boolean>;

  @ViewChild("newsletterModal") NewsletterModal: NewsletterModalComponent;

  public cookies: boolean;
  public exit: boolean;
  public theme: string;
  public show: boolean;
  public isBrowser: boolean;

  constructor(private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public themeOptionService: ThemeOptionService,
    @Inject(PLATFORM_ID) private platformId: Object,) {
      this.isBrowser = isPlatformBrowser(this.platformId);

    this.store.dispatch(new ThemeOptions())
    this.cookies$.subscribe(res => this.cookies = res);
    this.exit$.subscribe(res => this.exit = res);

    this.router.events.subscribe(
      (event) => {
        if ( event instanceof NavigationEnd ) {
          this.router.url
      }
      }
    );

    this.route.queryParams.subscribe(params => 
      // this.theme = params['theme']
      this.theme = 'single_product'
    );
    this.router.events.subscribe(
      (event: Params) => {
        if (this.isBrowser) {
          if(event instanceof NavigationEnd ) {
            if(this.theme){
              document.body.classList.add('home');
              themeOptionService.theme_color = '#854D9C';
              themeOptionService.theme_color_2 = '#d04ed6';
            }else {
            // document.body.classList.remove('home');
  
              this.themeOption$.subscribe((value) => {
                if(value){
                  themeOptionService.theme_color = value?.general?.primary_color;
                  themeOptionService.theme_color_2 = value?.general?.secondary_color;
  
                  document.body.style.setProperty('--theme-color', themeOptionService.theme_color);
                }
              })
            }
  
            document.body.style.setProperty('--theme-color', themeOptionService.theme_color);
  
            if(themeOptionService.theme_color_2 && (this.theme == 'marketplace_two' || this.theme == 'marketplace_four' || this.theme == 'marijuana' || this.theme == 'vegetables_four' || this.theme == 'gym' || this.theme == 'gradient' || this.theme == 'single_product')){
              document.body.style.setProperty('--theme-color2', themeOptionService.theme_color_2);
            }else{
              document.body.style.removeProperty('--theme-color2');
              themeOptionService.theme_color_2 = ''
            }
        }

        }
      }
    );

    this.themeOptionService.preloader = true;
    // const getCategories$ = this.store.dispatch(new GetCategories({ status: 1 }));
    const getMenu$ = this.store.dispatch(new GetMenu());

  
  }



  setLogo(){
    var headerLogo;
    var footerLogo;
    if(this.theme){
      if(this.theme == 'fashion_one' || this.theme == 'tools' || this.theme == 'left_sidebar' || this.theme == 'video'){
        headerLogo = "assets/images/icon/logo/12.png";
        footerLogo = "assets/images/icon/logo/f6.png";
      }
      else if(this.theme == 'fashion_two'){
        headerLogo = "assets/images/icon/logo/12.png";
        footerLogo = "assets/images/icon/logo/f3.png";
      }
      else if(this.theme == 'yoga'){
        headerLogo = "assets/images/icon/logo/41.png";
        footerLogo = "assets/images/icon/logo/41.png";
      }
      else if(this.theme == 'watch'){
        headerLogo = "assets/images/icon/logo/40.png";
        footerLogo = "assets/images/icon/logo/40.png";
      }
      else if(this.theme == 'vegetables_one'){
        headerLogo = "assets/images/icon/logo/12.png";
        footerLogo = "assets/images/icon/logo/12.png";
      }
      else if(this.theme == 'fashion_three'){
        headerLogo = "assets/images/icon/logo/39.png";
        footerLogo = "assets/images/icon/logo/39.png";
      }
      else if(this.theme == 'fashion_four'){
        headerLogo = "assets/images/icon/logo/10.png";
        footerLogo = "assets/images/icon/logo/10.png";
      }
      else if(this.theme == 'fashion_five'){
        headerLogo = "assets/images/icon/logo/46.png";
        footerLogo = "assets/images/icon/logo/46.png";
      }
      else if(this.theme == 'jewellery_one'){
        headerLogo = "assets/images/icon/logo/f14.png";
        footerLogo = "assets/images/icon/logo/f14.png";
      }
      else if(this.theme == 'fashion_six'){
        headerLogo = "assets/images/icon/logo/30.png";
        footerLogo = "assets/images/icon/logo/f9.png";
      }
      else if(this.theme == 'fashion_seven'){
        headerLogo = "assets/images/icon/logo/f12.png";
        footerLogo = "assets/images/icon/logo/f12.png";
      }
      else if(this.theme == 'furniture_one' || this.theme == 'furniture_two' || this.theme == 'jewellery_two' || this.theme == 'jewellery_three'){
        headerLogo = "assets/images/icon/logo/1.png";
        footerLogo = "assets/images/icon/logo/1.png";
      }
      else if(this.theme == 'furniture_dark'){
        headerLogo = "assets/images/icon/logo/f8.png";
        footerLogo = "assets/images/icon/logo/f8.png"
      }
      else if(this.theme == 'electronics_one'){
        headerLogo = "assets/images/icon/logo/3.png";
        footerLogo = "assets/images/icon/logo/3.png"
      }
      else if(this.theme == 'electronics_two'){
        headerLogo = "assets/images/icon/logo/5.png";
        footerLogo = "assets/images/icon/logo/5.png"
      }
      else if(this.theme == 'electronics_three' || this.theme == 'marketplace_three'){
        headerLogo = "assets/images/icon/logo/29.png";
        footerLogo = "assets/images/icon/logo/f10.png"
      }
      else if(this.theme == 'marketplace_one'){
        headerLogo = "assets/images/icon/logo/18.png";
        footerLogo = "assets/images/icon/logo/18.png"
      }
      else if(this.theme == 'marketplace_two'){
        headerLogo = "assets/images/icon/logo/f11.png";
        footerLogo = "assets/images/icon/logo/f11.png"
      }
      else if(this.theme == 'marketplace_four'){
        headerLogo = "assets/images/icon/logo/f11.png";
        footerLogo = "assets/images/icon/logo/32.png"
      }
      else if(this.theme == 'vegetables_two' || this.theme == 'vegetables_three'){
        headerLogo = "assets/images/icon/logo/7.png";
        footerLogo = "assets/images/icon/logo/7.png";
      }
      else if(this.theme == 'vegetables_four'){
        headerLogo = "assets/images/icon/logo/37.png";
        footerLogo = "assets/images/icon/logo/37.png";
      }
      else if(this.theme == 'bag'){
        headerLogo = "assets/images/icon/logo/logo.png";
        footerLogo = "assets/images/icon/logo/footerlogo.png"
      }
      else if(this.theme == 'medical'){
        headerLogo = "assets/images/icon/logo/22.png";
        footerLogo = "assets/images/icon/logo/22.png"
      }
      else if(this.theme == 'perfume'){
        headerLogo = "assets/images/icon/logo/34.png";
        footerLogo = "assets/images/icon/logo/34.png"
      }
      else if(this.theme == 'marijuana'){
        headerLogo = "assets/images/icon/logo/15.png";
        footerLogo = "assets/images/icon/logo/f2.png"
      }
      else if(this.theme == 'christmas'){
        headerLogo = "assets/images/icon/logo/f5.png";
        footerLogo = "assets/images/icon/logo/f5.png"
      }
      else if(this.theme == 'bicycle'){
        headerLogo = "assets/images/icon/logo/42.png";
        footerLogo = "assets/images/icon/logo/f5.png"
      }
      else if(this.theme == 'shoes'){
        headerLogo = "assets/images/icon/logo/48.png";
        footerLogo = "assets/images/icon/logo/f21.png"
      }
      else if(this.theme == 'flower'){
        headerLogo = "assets/images/icon/logo/6.png";
        footerLogo = "assets/images/icon/logo/6.png"
      }
      else if(this.theme == 'kids'){
        headerLogo = "assets/images/icon/logo/6.png";
        footerLogo = "assets/images/icon/logo/6.png"
      }
      else if(this.theme == 'books'){
        headerLogo = "assets/images/icon/logo/35.png";
        footerLogo = "assets/images/icon/logo/35.png"
      }
      else if(this.theme == 'beauty'){
        headerLogo = "assets/images/icon/logo/logo.png";
        footerLogo = "assets/images/icon/logo/logo.png"
      }
      else if(this.theme == 'surfboard'){
        headerLogo = "assets/images/icon/logo/47.png";
        footerLogo = "assets/images/icon/logo/47.png"
      }
      else if(this.theme == 'goggles'){
        headerLogo = "assets/images/icon/logo/4.png";
        footerLogo = "assets/images/icon/logo/4.png"
      }
      else if(this.theme == 'gym'){
        headerLogo = "assets/images/icon/logo/43.png";
        footerLogo = "assets/images/icon/logo/f15.png"
      }
      else if(this.theme == 'game'){
        headerLogo = "assets/images/icon/logo/44.png";
        footerLogo = "assets/images/icon/logo/f17.png"
      }
      else if(this.theme == 'video_slider'){
        headerLogo = "assets/images/icon/logo/17.png";
        footerLogo = "assets/images/icon/logo/17.png"
      }
      else if(this.theme == 'pets'){
        headerLogo = "assets/images/icon/logo/14.png";
        footerLogo = "assets/images/icon/logo/f18.png"
      }
      else if(this.theme == 'nursery'){
        headerLogo = "assets/images/icon/logo/7.png";
        footerLogo = "assets/images/icon/logo/f2.png"
      }
      else if(this.theme == 'gradient'){
        headerLogo = "assets/images/icon/logo/36.png";
        footerLogo = "assets/images/icon/logo/36.png"
      }
      else if(this.theme == 'full_page' || this.theme == 'parallax'){
        headerLogo = "assets/images/icon/logo/2.png";
        footerLogo = "assets/images/icon/logo/2.png"
      }
      else if(this.theme == 'digital_download'){
        headerLogo = "assets/images/icon/logo/45.png";
        footerLogo = "assets/images/icon/logo/45.png";
      }
      else if(this.theme == 'single_product'){
        headerLogo = "assets/images/icon/logo/file.png";
        footerLogo = "assets/images/icon/logo/file.png";
      }
    }else {
      this.themeOption$.subscribe(theme => {
      headerLogo = theme?.logo?.header_logo?.original_url;
      footerLogo = theme?.logo?.footer_logo?.original_url;
    });
    }
    return { header_logo: headerLogo, footer_logo: footerLogo}
  }


  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.isBrowser) {
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number > 600) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }
}
