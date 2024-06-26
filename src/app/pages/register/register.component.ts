// @ts-nocheck
import { HttpClient } from '@angular/common/http';
import { messages } from './../../shared/utils/messages';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterService } from './services/register.service';
import { IUser } from './interfaces/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {

  }

  messages = messages;
  registerForm: FormGroup = this.fb.group({
    role: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  toggleRole(role: 'dev' | 'cliente') {
    this.registerForm.get('role')?.setValue(role);
  }

  checkIfAnyRoleIsChecked() {
    let roles = document.getElementsByName("role");
    let counter = 0;

    for (let radioButton of roles) {
      if (radioButton.checked === false) {
        counter++;
      }
    }

    return roles.length !== counter;
  }

  register() {
    if (this.registerForm.valid) {
      let payload: IUser = this.registerForm.value;
      this.registerService.postUser(payload)
        .subscribe(response => {
          Swal.fire({
            title: "Bom trabalho!",
            text: "Cadastrado com sucesso!",
            icon: "success"
          }).then(result => {
            if (result.isConfirmed) {
              localStorage.setItem("user.name", response.fullName)
              localStorage.setItem("user.role", response.role === 'dev' ? 'Desenvolvedor' : 'Cliente')
              localStorage.setItem("user.id", response.id)

              this.router.navigateByUrl('list')
            }
          });
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  isInvalid(inputName: string, validatorName: string) {
    const formControl: any = this.registerForm.get(inputName);
    if (formControl.errors !== null) {
      return formControl.errors[validatorName] && formControl.touched;
    }
  }
}
