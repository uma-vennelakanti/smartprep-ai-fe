import { Routes } from '@angular/router';

import { Login} from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';
import { Test } from './pages/test/test';
import { Roadmap } from './pages/roadmap/roadmap';
import { Admin } from './pages/admin/admin';
export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'profile', component: Profile },
  { path: 'test', component: Test },
  { path: 'admin', component: Admin },
  { path: 'roadmap', component: Roadmap }

];