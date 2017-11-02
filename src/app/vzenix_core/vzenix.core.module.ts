// Global
import { NgModule } from '@angular/core';

// Fake HTTP
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { VZenixCoreFakeBackendProvider } from './backend/fake.backend';

// Services
import { VZenixCoreHttpService } from './services/http.service';
import { VZenixCoreAuthService } from './services/auth.service';
import { VZenixCoreUsersService } from './services/users.service';


@NgModule({
  providers: [
    VZenixCoreFakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    VZenixCoreHttpService,
    VZenixCoreAuthService,
    VZenixCoreUsersService
  ],
  imports: [],
  exports: [
    VZenixCoreHttpService,
    VZenixCoreAuthService,
    VZenixCoreUsersService
  ]
})
export class VZenixCoreModule { }
