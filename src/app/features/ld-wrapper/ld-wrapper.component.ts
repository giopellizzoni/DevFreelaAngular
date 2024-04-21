import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ld-wrapper',
  templateUrl: './ld-wrapper.component.html',
  styleUrl: './ld-wrapper.component.scss'
})

export class LdWrapperComponent {

  @Input() type: 'one-col' | 'two-col' = 'two-col';

}
