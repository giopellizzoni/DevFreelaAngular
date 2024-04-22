import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ld-wrapper',
  templateUrl: './ld-wrapper.component.html',
  styleUrl: './ld-wrapper.component.scss'
})

export class LdWrapperComponent {
  @Input() back: string = ''
  @Input() type: 'one-col' | 'two-col' = 'two-col';

  constructor(private router: Router) {}

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
