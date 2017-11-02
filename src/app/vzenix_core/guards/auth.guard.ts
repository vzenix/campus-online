import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { VZenixCoreAuthService } from '../services/auth.service';

/** Check authy guard for routing */
@Injectable()
export class VZenixAuthGuard implements CanActivate {

  /**
   * constructor
   * @param {Router} router
   * @param {VCoreAuthService} auth
   */
  constructor(
    private router: Router,
    private auth: VZenixCoreAuthService
  ) { }

  /** {@inheritDoc} */
  canActivate() {
      return true;
  }
}