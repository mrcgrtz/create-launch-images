import test from 'ava';
import getDeviceByOrientation from '../src/get-device-by-orientation.js';

const orientations = [
	'portrait',
	'portrait-primary',
	'portrait-secondary',
	'landscape',
	'landscape-primary',
	'landscape-secondary',
	'any',
];

for (const orientation of orientations) {
	test(`Gets devices for ${orientation} orientation`, t => {
		t.snapshot(getDeviceByOrientation(orientation));
	});
}
