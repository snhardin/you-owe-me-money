import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

describe('loggerService', () => {
	let service: LoggerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LoggerService,
			],
		});
		service = TestBed.inject(LoggerService);
	});

	test('should be created', () => {
		expect.assertions(1);
		expect(service).toBeTruthy();
	});
});
