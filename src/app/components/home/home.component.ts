import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ThemeOptionService } from '../../shared/services/theme-option.service';

import { GetHomePage } from '../../shared/store/action/theme.action';

import { ThemeState } from '../../shared/store/state/theme.state';

import { SingleProductComponent } from './single-product/single-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SingleProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @Select(ThemeState.homePage) homePage$: Observable<string>;
  @Select(ThemeState.activeTheme) activeTheme$: Observable<string>;

  public theme: string;
  public homePage:any

  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {
      this.route.queryParams.subscribe(params => {
        this.themeOptionService.preloader = true;
        this.activeTheme$.subscribe(theme => {
          // this.theme = params['theme'] ? params['theme'] : theme;
          this.theme = 'single_product';
          if(this.theme){
            this.store.dispatch(new GetHomePage('single_product')).subscribe(data => {
              console.log('theme ---', data.theme.homePage);
              
              this.homePage = data.theme.homePage;
              this.themeOptionService.preloader = false;
            })
          }
        })
    });
  }
}
