import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectCreateEditService } from './services/project-create-edit.service';
import { IProject } from '../../shared/interfaces/IProject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { messages } from '../../shared/utils/messages';

@Component({
  selector: 'app-project-create-edit',
  templateUrl: './project-create-edit.component.html',
  styleUrl: './project-create-edit.component.scss'
})
export class ProjectCreateEditComponent implements OnInit {

  id: string;
  screenType: 'edit' | 'create';

  title: string = '';
  actionButtonText: string = '';

  projectForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    totalCost: ['', [Validators.required]]
  })

  messages = messages;

  constructor(private router: Router, private projectService: ProjectCreateEditService, private fb: FormBuilder) {
    this.id = history.state.projectId;
    this.screenType = this.id ? 'edit' : 'create';
  }

  ngOnInit(): void {
    this.setScreeTypeTexts();
    this.fillInputs();
  }

  createOrEdit() {

    if (this.projectForm.valid) {
      let payload: IProject = this.projectForm.value;
      payload.idClient = localStorage.getItem('user.id');

      if (this.screenType === 'create') {
        this.projectService.postProject(payload)
          .subscribe(response => {
            alert('Projeto cadastrado com sucesso!');
            this.router.navigateByUrl('list');
          });
      }

      if (this.screenType === 'edit') {
        this.projectService.putProject(payload, this.id)
          .subscribe(response => {
            alert('Projeto editado com sucesso!');
            this.router.navigateByUrl('list');
          });
      };
    } else {
      this.projectForm.markAllAsTouched();
    }
  }


  fillInputs() {
    if (this.screenType === 'edit') {
      this.projectService.fetchProjectBy(this.id)
        .subscribe(project => {
          this.projectForm.patchValue({
            title: project.title,
            totalCost: project.totalCost,
            description: project.description
          });
        })
    }
  }
  setScreeTypeTexts() {
    if (this.screenType == 'create') {
      this.title = "Vamos cadastrar seu novo projeto!";
      this.actionButtonText = "Cadastrar";
    }

    if (this.screenType == 'edit') {
      this.title = "Editar Projeto";
      this.actionButtonText = "Salvar";
    }
  }

  isInvalid(inputName: string, validatorName: string) {
    const formControl: any = this.projectForm.get(inputName);
    if (formControl.errors !== null) {
      return formControl.errors[validatorName] && formControl.touched;
    }
  }

}
