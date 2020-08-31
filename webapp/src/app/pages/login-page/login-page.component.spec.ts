import { Component } from '@angular/core';
import { GoogleSignInButtonModule } from 'src/app/components/google-sign-in-button/google-sign-in-button.module';
import { LoginPageComponent } from './login-page.component';
import { LoginPageModule } from './login-page.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Mocks the Google Sign In Button
 */
@Component({
	selector: 'google-sign-in-button',
	template: '<div>This is a mock component.</div>',
})
class MockGoogleSignInButtonComponent { }

describe('loginPageComponent', () => {
	let component: LoginPageComponent;
	let fixture: ComponentFixture<LoginPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				LoginPageModule,
			],
		}).overrideModule(LoginPageModule, {
			remove: {
				imports: [
					GoogleSignInButtonModule,
				],
			},
			add: {
				declarations: [
					MockGoogleSignInButtonComponent,
				],
			},
		})
			.compileComponents();

		fixture = TestBed.createComponent(LoginPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect.assertions(1);
		expect(component).toBeTruthy();
	});
});
