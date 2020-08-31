import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Mock component for the navigation bar
 */
@Component({
	selector: 'app-nav-bar',
	template: '<div>This is a mock component.</div>',
})
class MockNavBarComponent { }

describe('appComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				MockNavBarComponent,
			],
			imports: [
				RouterTestingModule,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		component = fixture.componentInstance;
	});

	test('should create the app', () => {
		expect.assertions(1);
		expect(component).toBeTruthy();
	});
});
