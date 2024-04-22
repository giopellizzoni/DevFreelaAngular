import { Component, OnInit } from '@angular/core';

import { ListService } from './services/list.service';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { IProject } from '../../shared/interfaces/IProject';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(private listService: ListService, private router: Router) { }
  list: IProject[] = [];
  tableIsLoaded: boolean = false;

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.listService.getProjects()
      .subscribe((response: IProject[]) => {

        this.list = response;
        this.buildTable();
        this.tableIsLoaded = true;
      });
  }

  buildTable() {
    const idClient = localStorage.getItem('user.id');
    this.list = this.list.filter(el => el.idClient === idClient);
  }

  deleteProject(id: string) {
    this.listService.deleteProject(id)
      .subscribe(response => {
        this.list = this.list.filter(project => project.id != id);
        this.buildTable();
      });
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  redirectToWithParams(url: string, projectId: string) {
    const dataParams: NavigationBehaviorOptions = {
      state: {
        projectId: projectId
      }
    };
    this.router.navigate([url], dataParams);
  }
}
