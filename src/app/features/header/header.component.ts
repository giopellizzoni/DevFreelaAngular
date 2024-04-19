import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  user: IUser = {};

  ngOnInit(): void {
    this.buildHeader()
  }

  buildHeader() {
    if (this.checkIfUserIsLogged()) {
      this.user.name = localStorage.getItem('user.name') || '';
      this.user.role = localStorage.getItem('user.role') || '';
    }
  }

  checkIfUserIsLogged() {
    return localStorage.getItem('user.name') && localStorage.getItem('user.name')
  }
}
