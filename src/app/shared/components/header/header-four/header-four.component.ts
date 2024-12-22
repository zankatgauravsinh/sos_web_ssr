import { Component, HostListener, Input } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { HeaderLogoComponent } from '../widgets/header-logo/header-logo.component';

import { RouterModule } from '@angular/router';
import { TopBarComponent } from '../../widgets/top-bar/top-bar.component';
// import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-header-four',
  standalone: true,
  imports: [CommonModule, RouterModule,
            HeaderLogoComponent, TopBarComponent],
  templateUrl: './header-four.component.html',
  styleUrl: './header-four.component.scss'
})
export class HeaderFourComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() class: string;
  @Input() sticky: boolean | number | undefined; // Default false

  public stick: boolean = false;

  constructor(){}
  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 50 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }


}
