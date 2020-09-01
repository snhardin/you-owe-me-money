import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		component: HomePageComponent,
		path: '',
	},
	{
		canActivate: [LoggedInGuard],
		component: AdminPageComponent,
		path: 'admin',
	},
	{
		canActivate: [NotLoggedInGuard],
		component: LoginPageComponent,
		path: 'login',
	},
];

/**
 * Application routing module
 */
@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
