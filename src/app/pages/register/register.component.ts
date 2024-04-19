// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
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

    if(this.checkIfAnyRoleIsChecked() === false) {
        Swal.fire({
            title: "Algo deu errado...",
            text: "Selecione algum perfil!",
            icon: "error"
          });
        return;
    }

    let payload = {
        role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'cliente',
        fullName: document.querySelector("#fullName").value,
        birthDate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }


    fetch("https://661e92ea98427bbbef0503c3.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        Swal.fire({
            title: "Bom trabalho!",
            text: "Cadastrado com sucesso!",
            icon: "success"
          });

        localStorage.setItem("user.name", response.fullName)
        localStorage.setItem("user.role", response.role === 'dev' ? 'Desenvolvedor' : 'Cliente')
        localStorage.setItem("user.id", response.id)

        window.location.href = "list.html"
    });
  }

}
