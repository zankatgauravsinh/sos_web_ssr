import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Option } from '../../../interface/theme-option.interface';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { SettingState } from '../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../interface/setting.interface';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  @Select(SettingState.setting) setting$ : Observable<Values>;

  @Input() data: Option | null;
  @Input() darkTopBar: boolean;

}
