import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';

@Component({
  selector: 'angular-engie-training-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'exc-ecommerce-app';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchUser();
  }
}
