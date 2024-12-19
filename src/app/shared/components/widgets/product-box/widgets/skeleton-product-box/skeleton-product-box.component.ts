import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-product-box',
  standalone: true,
  imports: [],
  templateUrl: './skeleton-product-box.component.html',
  styleUrl: './skeleton-product-box.component.scss'
})
export class SkeletonProductBoxComponent {

  @Input() style: string;
  
}
