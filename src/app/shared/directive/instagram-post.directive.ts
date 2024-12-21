import { Directive, OnInit } from '@angular/core';

declare namespace instgrm {
  namespace Embeds {
    function process(): void;
  }
}

@Directive({
  selector: '[data-instgrm-permalink]',
  standalone: true
})
export class InstagramPostDirective implements OnInit {
  public ngOnInit(): void {
    if (((window as any)['instgrm'])) {
      instgrm.Embeds.process()
    }
  }
}