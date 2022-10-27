import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { AuthUser } from '../../shared/models/auth-user.model';

@Component({
  selector: 'wc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: AuthUser;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
}
