import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'wc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}
}
