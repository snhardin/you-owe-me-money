import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
	},
	{
		path: 'admin',
		canActivate: [LoggedInGuard],
		component: AdminPageComponent,
	},
	{
		path: 'login',
		canActivate: [NotLoggedInGuard],
		component: LoginPageComponent,
	},
];

/**
 * Application routing module
 */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
