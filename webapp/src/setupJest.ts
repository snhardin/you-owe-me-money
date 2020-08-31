import 'jest-preset-angular';

const authObj = {
	isSignedIn: {
		get: jest.fn(() => true),
		listen: jest.fn(),
	},
};

const mockGapi = {
	auth2: {
		init: jest.fn(() => ({
			then: jest.fn(onInit => {
				onInit(authObj);
			}),
		})),
	},
	client: jest.fn(),
	load: jest.fn((_, callback) => {
		callback();
	}),
	signin2: {
		render: jest.fn(),
	},
};

global.gapi = mockGapi as any;
