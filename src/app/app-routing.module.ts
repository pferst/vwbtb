import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainer } from './login/container/login.container';

const routes: Routes = [
  { path: 'login', component: LoginContainer },
  //{ path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to login
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
