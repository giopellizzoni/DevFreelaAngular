import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IListItem } from './interfaces/IListItem';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(private listService: ListService) { }
  list: IListItem[] = [];

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.listService.getProjects()
    .subscribe((response: IListItem[]) => {
      this.list = response;
      this.buildTable();
    });
  }

  buildTable() {
    document.querySelector("#table-body").innerHTML = '';
    const idClient = localStorage.getItem('idClient');

    this.list = this.list.filter(el => el.idClient === idClient);

    this.list.forEach(el => {
      let template = `
            <div class="row">
                <div class="title-description">
                    <h6 class="title">${el.title}</h6>
                    <p class="description">${el.description}</p>
                </div>
                <div class="price">R$ ${el.totalCost}</div>
                <div class="actions">
                    <span class="edit material-icons" onclick="goToEdit(${el.id})">edit</span>
                    <span class="delete material-icons" onclick="deleteProject(${el.id})">delete_outline</span>
                </div>
            </div>
        `

      document.querySelector("#table-body").insertAdjacentHTML("beforeend", template)
    });
  }

  goToEdit(id) {
    window.location.href = `project-create-edit.html?id=${id}`;
  }

  deleteProject(id) {
    fetch(environment.apiURL + `projects/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(response => {
        this.list = this.list.filter(project => project.id != id);

        buildTable();
      })
  }

}
