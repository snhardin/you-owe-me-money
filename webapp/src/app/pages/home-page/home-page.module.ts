import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from './home-page.component';
import { NgModule } from '@angular/core';

/**
 * Module for Home Page
 */
@NgModule({
	declarations: [
		HomePageComponent,
	],
	exports: [
		HomePageComponent,
	],
	imports: [
		BrowserModule,
	],
})
export class HomePageModule { }
