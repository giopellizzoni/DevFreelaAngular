import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ld-button',
  templateUrl: './ld-button.component.html',
  styleUrl: './ld-button.component.scss'
})
export class LdButtonComponent implements OnInit {

  @Input() text: string = '';

  ngOnInit(): void {

  }

}
