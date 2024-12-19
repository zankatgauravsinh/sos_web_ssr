import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Select } from '@ngxs/store';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { Observable } from 'rxjs';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [CommonModule, TranslateModule,BreadcrumbComponent, ButtonComponent],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})
export class Error404Component {

  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "404 page",
    items: [{ label: "404 page", active: true }]
  }

  constructor(private location: Location) {}

  back(){
    this.location.back();
  }
}
