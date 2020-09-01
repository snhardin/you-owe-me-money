import { AdminPageComponent } from './admin-page.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('adminPageComponent', () => {
	let component: AdminPageComponent;
	let fixture: ComponentFixture<AdminPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AdminPageComponent,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AdminPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	test('should create', () => {
		expect.assertions(1);
		expect(component).toBeTruthy();
	});
});
