import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerService } from './logger.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('authenticationService', () => {
	let mockLogger: Partial<LoggerService>;
	let service: AuthenticationService;

	beforeAll(() => {
		mockLogger = {
			debug: jest.fn(),
			error: jest.fn(),
			info: jest.fn(),
			trace: jest.fn(),
			warn: jest.fn(),
		};
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				RouterTestingModule,
			],
			providers: [
				AuthenticationService,
				LoggerService,
			],
		}).overrideProvider(LoggerService, {
			useValue: mockLogger,
		});

		service = TestBed.inject(AuthenticationService);
	});

	afterEach(() => {
		(mockLogger.debug as jest.Mock).mockClear();
		(mockLogger.error as jest.Mock).mockClear();
		(mockLogger.info as jest.Mock).mockClear();
		(mockLogger.trace as jest.Mock).mockClear();
		(mockLogger.warn as jest.Mock).mockClear();
	});

	test('should be created', () => {
		expect.assertions(1);
		expect(service).toBeTruthy();
	});
});
