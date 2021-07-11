import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainer } from './login/container/login.container';
import { BugsRepContainer } from './bugsRep/container/bugs-rep/bugs-rep.container';
import { StatsContainer } from './stats/container/stats/stats.container';


const routes: Routes = [
  { path: 'login', component: LoginContainer },
  { path: '', component: BugsRepContainer },
  { path: 'stats', component: StatsContainer }
  //{ path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to login
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
