import { AuthenticationService } from '../services/authentication.service';
import { LoggedInGuard } from './logged-in.guard';
import { TestBed } from '@angular/core/testing';

describe('loggedInGuard', () => {
	let authMock: Partial<AuthenticationService>;
	let guard: LoggedInGuard;

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
				LoggedInGuard,
			],
		}).overrideProvider(AuthenticationService, {
			useValue: authMock,
		});

		guard = TestBed.inject(LoggedInGuard);
	});

	afterAll(() => {
		(authMock.checkLoggedIn as jest.Mock).mockClear();
		(authMock.handleGoogleAPILogin as jest.Mock).mockClear();
		(authMock.logout as jest.Mock).mockClear();
	});

	test('should be created', () => {
		expect.assertions(1);
		expect(guard).toBeTruthy();
	});
});
