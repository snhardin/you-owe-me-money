import { BalanceService } from './balance.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('balanceService', () => {
	let service: BalanceService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
			],
			providers: [
				BalanceService,
			],
		});

		service = TestBed.inject(BalanceService);
	});

	test('should be created', () => {
		expect.assertions(1);
		expect(service).toBeTruthy();
	});
});
