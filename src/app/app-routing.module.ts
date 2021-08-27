import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './authentication/login.component';
import { RegisterComponent } from './authentication/register.component';
import { HistoryComponent } from './forest-city/our-history/history.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent,
    // children go here, including those that need auths.  for those, use activationguard
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent,
        // loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
      },
      {
        path: 'history',
        component: HistoryComponent
      }
    ]
  },
  // routes without header or footer
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    // MUST BE LAST
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules
    }
  )
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
