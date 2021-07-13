import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainer } from './login/container/login.container';
import { BugsRepContainer } from './bugsRep/container/bugs-rep/bugs-rep.container';
import { PicViewComponent } from './bugsRep/component/pic-view/pic-view.component';
import { StatsComponent } from './bugsRep/component/stats/stats.component';
import { MainViewContainer } from './bugsRep/container/main-view/main-view.container';
import { AuthguardGuard } from './guard/authguard.guard';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginContainer },
  { 
    path: '', 
    component: BugsRepContainer,
    //canActivate: [AuthguardGuard],
    children: [
      {
        path: '',
        component: MainViewContainer
        
      },
      {
        path: 'stats',
        component: StatsComponent
      }
    ]
  },
  //{ path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to login
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthguardGuard, AuthService]
})
export class AppRoutingModule { }
