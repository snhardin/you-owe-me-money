import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { NavBarComponent } from './nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, LoginState } from 'src/app/services/authentication.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

/**
 * Represents a mock component that shows when a route is loaded from the routing module
 */
@Component({
	selector: 'test-component',
	template: '<div>This is a test.</div>',
})
class MockRoutingComponent { }

describe('navBarComponent', () => {
	let authMock: Partial<AuthenticationService>;
	let component: NavBarComponent;
	let fixture: ComponentFixture<NavBarComponent>;
	let loggerMock: Partial<LoggerService>;

	beforeAll(() => {
		authMock = {
			login$: new BehaviorSubject<LoginState>({
				loggedIn: true,
			}),
			checkLoggedIn: jest.fn(),
			handleGoogleAPILogin: jest.fn(),
			logout: jest.fn(),
		};

		loggerMock = {
			debug: jest.fn(),
			error: jest.fn(),
			info: jest.fn(),
			trace: jest.fn(),
			warn: jest.fn(),
		};
	});

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MockRoutingComponent,
				NavBarComponent,
			],
			imports: [
				RouterTestingModule.withRoutes([
					{
						component: MockRoutingComponent,
						path: '',
					},
					{
						component: MockRoutingComponent,
						path: 'admin',
					},
					{
						component: MockRoutingComponent,
						path: 'login',
					},
				]),
			],
			providers: [
				{
					provide: AuthenticationService,
					useValue: authMock,
				},
				{
					provide: LoggerService,
					useValue: loggerMock,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(NavBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		(authMock.checkLoggedIn as jest.Mock).mockClear();
		(authMock.handleGoogleAPILogin as jest.Mock).mockClear();
		(authMock.logout as jest.Mock).mockClear();

		(loggerMock.debug as jest.Mock).mockClear();
		(loggerMock.error as jest.Mock).mockClear();
		(loggerMock.info as jest.Mock).mockClear();
		(loggerMock.trace as jest.Mock).mockClear();
		(loggerMock.warn as jest.Mock).mockClear();
	});

	test('should create', () => {
		expect.assertions(1);
		expect(component).toBeTruthy();
	});
});
