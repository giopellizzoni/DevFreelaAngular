import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IListItem } from '../interfaces/IListItem';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<IListItem[]>(environment.apiURL + "projects");
  }

  deleteProject(id: string) {
    return this.http.delete(`${environment.apiURL}projects/${id}`);
  }
}
