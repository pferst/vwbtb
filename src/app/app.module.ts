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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginContainer } from './login/container/login.container';
import { LoginComponent } from './login/component/login.component';
import { BugsRepContainer } from './bugsRep/container/bugs-rep/bugs-rep.container';
import { BugsRepFormComponent } from './bugsRep/component/bugs-rep-form/bugs-rep-form.component';
import { PicViewComponent } from './bugsRep/component/pic-view/pic-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { StatsComponent } from './bugsRep/component/stats/stats.component';
import { MainViewContainer } from './bugsRep/container/main-view/main-view.container';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginContainer,
    LoginComponent,
    BugsRepContainer,
    BugsRepFormComponent,
    PicViewComponent,
    NavbarComponent,
    TabsComponent,
    StatsComponent,
    MainViewContainer,
    SnackBarComponent,
    DialogLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
