import { BrowserModule } from '@angular/platform-browser';
import { GoogleSignInButtonModule } from 'src/app/components/google-sign-in-button/google-sign-in-button.module';
import { LoginPageComponent } from './login-page.component';
import { NgModule } from '@angular/core';

/**
 * Module for the Login Page
 */
@NgModule({
	declarations: [
		LoginPageComponent,
	],
	exports: [
		LoginPageComponent,
	],
	imports: [
		BrowserModule,
		GoogleSignInButtonModule,
	],
})
export class LoginPageModule { }
