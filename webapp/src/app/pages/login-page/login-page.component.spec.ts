import { Component } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
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
			declarations: [
				LoginPageComponent,
				MockGoogleSignInButtonComponent,
			]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect.assertions(1);
		expect(component).toBeTruthy();
	});
});
