import test from 'ava';
import devices from '../src/devices.js';

test('Each device is described by its width, height, and DPI', t => {
	for (const device of devices) {
		t.true(typeof device.width === 'number');
		t.true(typeof device.height === 'number');
		t.true(typeof device.dpi === 'number');
		t.is(Object.keys(device).length, 3);
	}
});

test('List of devices did not change unexpectedly', t => {
	t.snapshot(devices);
});
