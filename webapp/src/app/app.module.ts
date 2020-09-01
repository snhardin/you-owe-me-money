import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleSignInButtonComponent } from './components/google-sign-in-button/google-sign-in-button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggerService } from './services/logger.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { APP_INITIALIZER, NgModule } from '@angular/core';

/**
 * Application module
 */
@NgModule({
	declarations: [
		AppComponent,
		NavBarComponent,
		GoogleSignInButtonComponent,
		AdminPageComponent,
		HomePageComponent,
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
		AuthenticationService,
		LoggedInGuard,
		LoggerService,
		NotLoggedInGuard,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * Run before the application starts
 * @param auth Authentication service
 * @returns Promise that resolves when the authentication service has checked if
 * the user is logged in
 */
function initializeApp (auth: AuthenticationService) {
	return () => auth.checkLoggedIn().toPromise();
}
