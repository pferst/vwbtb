import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginContainer } from './login/container/login.container';
import { LoginComponent } from './login/component/login.component';
import { BugReportContainer } from './bugsReport/container/bug-report/bug-report.container';
import { BugFormComponent } from './bugsReport/component/bug-form/bug-form.component';
import { PicViewComponent } from './bugsReport/component/pic-view/pic-view.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginContainer,
    LoginComponent,
    BugReportContainer,
    BugFormComponent,
    PicViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
