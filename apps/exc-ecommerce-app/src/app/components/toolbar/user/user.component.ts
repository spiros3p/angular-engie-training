import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'angular-engie-training-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user!: string;

  submitUserForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onRemoveUser() {
    this.userService.removeUser();
    if (this.router.url !== '/') this.router.navigate(['/']);
  }

  onSubmitUser() {
    if (!this.submitUserForm.valid) {
      alert('User cannot be empty');
      return;
    }
    this.submitUserForm.value.user &&
      this.userService.setUser(this.submitUserForm.value.user);
    this.submitUserForm.reset();
  }
}
