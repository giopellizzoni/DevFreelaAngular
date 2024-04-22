import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateEditComponent } from './project-create-edit.component';
import { ProjectCreateEditRoutingModule } from './project-create-edit-routing.module';
import { LdWrapperModule } from '../../features/ld-wrapper/ld-wrapper.module';
import { LdButtonModule } from '../../shared/components/ld-button/ld-button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    ProjectCreateEditComponent
  ],
  imports: [
    CommonModule,
    ProjectCreateEditRoutingModule,
    LdWrapperModule,
    LdButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ProjectCreateEditModule { }
