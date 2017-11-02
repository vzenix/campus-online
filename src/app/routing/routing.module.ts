// Global
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Skeleton


// Rutas de la aplicación
const routes: Routes = [
  // Generales
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'login', component: VCoreLoginComponent },
  // { path: 'logup', component: VCoreLogupComponent },
  // { path: 'profile', component: VCoreProfileComponent, canActivate: [VCoreAuthGuard] },
  // { path: 'dashboard', component: VCoreProfileComponent, canActivate: [VCoreAuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}