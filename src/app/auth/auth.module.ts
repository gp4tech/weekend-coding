import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthUserService } from './auth-user.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, AuthGuard, AuthUserService],
})
export class AuthModule {}
