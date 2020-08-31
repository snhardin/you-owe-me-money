import { AdminPageComponent } from './admin-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * Module for Admin Page
 */
@NgModule({
	declarations: [
		AdminPageComponent,
	],
	exports: [
		AdminPageComponent,
	],
	imports: [
		BrowserModule,
	],
})
export class AdminPageModule { }
