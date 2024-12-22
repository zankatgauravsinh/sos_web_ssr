import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Values } from '../../shared/interface/setting.interface';
import { SettingState } from '../../shared/store/state/setting.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  @Select(SettingState.setting) setting$: Observable<Values>;

  public isMaintenanceModeOn: boolean = false;

  constructor(private store: Store, private router: Router, private ngZone: NgZone) {
    this.setting$.subscribe(setting => {
      this.isMaintenanceModeOn = setting?.maintenance?.maintenance_mode!
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {

    // If Maintenance Mode On
    if (this.isMaintenanceModeOn) {
      this.ngZone.run(() => {
        this.router.navigate(['/maintenance']);
      })
      // End the interceptor chain if in maintenance mode
    }

    const token = this.store.selectSnapshot(state => state.auth.access_token);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.store.dispatch(new AuthClear());

        }
        return throwError(() => error);
      })
    );

  }
}
