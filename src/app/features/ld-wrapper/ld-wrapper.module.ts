import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdWrapperComponent } from './ld-wrapper.component';
import { HeaderModule } from '../header/header.module';
import { LdButtonModule } from '../../shared/components/ld-button/ld-button.module';



@NgModule({
  declarations: [
    LdWrapperComponent
  ],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [
    LdWrapperComponent
  ]
})
export class LdWrapperModule { }
