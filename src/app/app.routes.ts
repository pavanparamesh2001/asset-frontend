import { Routes } from '@angular/router';
import { AssetListComponent } from './features/assets/asset-list/asset-list.component';
import { AssetRegisterComponent } from './features/assets/asset-register/asset-register.component';
import { AssetAssignComponent } from './features/assignments/asset-assign/asset-assign.component';
import { LoginComponent } from './features/auth/login/login.component';
import { EmployeeListComponent } from './features/employee-list/employee-list.component';
import { EmployeeRegisterComponent } from './features/employee-register/employee-register.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { ScanAssetComponent } from './scan-asset/scan-asset.component';

import { authGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SettingsComponent } from './settings/settings.component';
import { AssetReturnComponent } from './assignments/asset-return/asset-return.component';
import { AssetPhotosComponent } from './assets/asset-photos/asset-photos.component';
import { AssetEditComponent } from './assets/asset-edit/asset-edit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'scan/:id', component: ScanAssetComponent },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'assets', pathMatch: 'full' },
      { path: 'assets', component: AssetListComponent },
      { path: 'assets/register', component: AssetRegisterComponent },
      { path: 'assets/:id/assign', component: AssetAssignComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/register', component: EmployeeRegisterComponent },
      { path: 'employees/:id/edit', component: EmployeeEditComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'assets/:id/return', component: AssetReturnComponent },
      { path: 'assets/:id/photos', component: AssetPhotosComponent },
      { path: 'assets/:id/edit', component: AssetEditComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];