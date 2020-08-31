import { BalanceService } from 'src/app/services/balance.service';
import { BehaviorSubject } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { HomePageModule } from './home-page.module';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthenticationService, LoginState } from 'src/app/services/authentication.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('homePageComponent', () => {
	let authMock: Partial<AuthenticationService>;
	let balanceMock: Partial<BalanceService>;
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;
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

		balanceMock = {
			getBalance: jest.fn(),
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
			imports: [
				HomePageModule,
			],
			providers: [
				{
					provide: AuthenticationService,
					useValue: authMock,
				},
				{
					provide: BalanceService,
					useValue: balanceMock,
				},
				{
					provide: LoggerService,
					useValue: loggerMock,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		(authMock.checkLoggedIn as jest.Mock).mockClear();
		(authMock.handleGoogleAPILogin as jest.Mock).mockClear();
		(authMock.logout as jest.Mock).mockClear();

		(balanceMock.getBalance as jest.Mock).mockClear();

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
