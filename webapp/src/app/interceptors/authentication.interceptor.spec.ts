import { AuthenticationInterceptor } from './authentication.interceptor';
import { AuthenticationService } from '../services/authentication.service';
import { TestBed } from '@angular/core/testing';

describe('authenticationInterceptor', () => {
	let authMock: Partial<AuthenticationService>;
	let interceptor: AuthenticationInterceptor;

	beforeAll(() => {
		authMock = {
			checkLoggedIn: jest.fn(),
			handleGoogleAPILogin: jest.fn(),
			logout: jest.fn(),
		};
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthenticationService,
				AuthenticationInterceptor
			],
		}).overrideProvider(AuthenticationService, {
			useValue: authMock,
		});

		interceptor = TestBed.inject(AuthenticationInterceptor);
	});

	afterAll(() => {
		(authMock.checkLoggedIn as jest.Mock).mockClear();
		(authMock.handleGoogleAPILogin as jest.Mock).mockClear();
		(authMock.logout as jest.Mock).mockClear();
	});

	test('should be created', () => {
		expect.assertions(1);
		expect(interceptor).toBeTruthy();
	});
});
