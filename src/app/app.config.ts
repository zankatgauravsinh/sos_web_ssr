import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandlerInterceptor } from './core/interceptors/global-error-handler.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { ErrorService } from './shared/services/error.service';
import { SeoService } from './shared/services/seo.service';

// States //
import { LoaderState } from './shared/store/state/loader.state';
import { ProductState } from './shared/store/state/product.state';
import { SettingState } from './shared/store/state/setting.state';
import { StateState } from './shared/store/state/state.state';
import { ThemeOptionState } from './shared/store/state/theme-option.state';
import { ThemeState } from './shared/store/state/theme.state';
import { ServerInterceptor } from './core/interceptors/server.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    CurrencyPipe,
    ErrorService,
    SeoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptor,
      multi: true,
    },
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      CarouselModule,
      LoadingBarRouterModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-center',
        preventDuplicates: true
      }),
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en'
    }),

      NgxsModule.forRoot([
        LoaderState,
        ProductState,
        SettingState,
        StateState,
        ThemeOptionState,
        ThemeState,
      ]),
      // NgxsModule.forFeature([AuthState]),
      RouterModule.forRoot(routes , {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      NgxsStoragePluginModule.forRoot({
        key: [
          "auth",
          'account',
          "theme_option",
          "theme",
          "setting",
          "cart"
        ]
      })
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration()
  ]
};
