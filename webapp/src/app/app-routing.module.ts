import { LoggedInGuard } from './guards/logged-in.guard';
import { NgModule } from '@angular/core';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule),
		path: '',
	},
	{
		canActivate: [LoggedInGuard],
		loadChildren: () => import('./pages/admin-page/admin-page.module').then(m => m.AdminPageModule),
		path: 'admin',
	},
	{
		canActivate: [NotLoggedInGuard],
		loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
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
