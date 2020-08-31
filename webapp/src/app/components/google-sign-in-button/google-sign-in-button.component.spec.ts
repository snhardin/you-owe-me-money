import { AuthenticationService } from 'src/app/services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { GoogleSignInButtonComponent } from './google-sign-in-button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('googleSignInButtonComponent', () => {
	let authMock: Partial<AuthenticationService>;
	let component: GoogleSignInButtonComponent;
	let fixture: ComponentFixture<GoogleSignInButtonComponent>;

	beforeAll(() => {
		authMock = {
			gapiInitialized$: new BehaviorSubject<boolean>(true),
			checkLoggedIn: jest.fn(),
			handleGoogleAPILogin: jest.fn(),
			logout: jest.fn(),
		};
	});

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				GoogleSignInButtonComponent,
			],
			providers: [
				{
					provide: AuthenticationService,
					useValue: authMock,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(GoogleSignInButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		(authMock.checkLoggedIn as jest.Mock).mockClear();
		(authMock.handleGoogleAPILogin as jest.Mock).mockClear();
		(authMock.logout as jest.Mock).mockClear();
	});

	test('should create', () => {
		expect.assertions(1);
		expect(component).toBeTruthy();
	});
});
