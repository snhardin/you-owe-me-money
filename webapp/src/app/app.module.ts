import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GoogleSignInButtonComponent } from './components/google-sign-in-button/google-sign-in-button.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminPageComponent,
    NavBarComponent,
    GoogleSignInButtonComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      deps: [AuthenticationService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initializeApp (auth: AuthenticationService) {
  return () => {
    return auth.checkLoggedIn().toPromise();
  }
}
