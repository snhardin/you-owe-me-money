import { AuthenticationService } from '../services/authentication.service';
import { NotLoggedInGuard } from './not-logged-in.guard';
import { TestBed } from '@angular/core/testing';

describe('notLoggedInGuard', () => {
	let authMock: Partial<AuthenticationService>;
	let guard: NotLoggedInGuard;

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
				NotLoggedInGuard,
			],
		}).overrideProvider(AuthenticationService, {
			useValue: authMock,
		});

		guard = TestBed.inject(NotLoggedInGuard);
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
