import test from 'ava';
import getLargestSquareIcon from '../src/get-largest-square-icon.js';

const icons = [{
	src: 'foo.ico',
	sizes: '16x16 32x32 256x256',
}, {
	src: 'bar.png',
	sizes: '64x64',
	purpose: 'maskable',
}, {
	src: 'baz.png',
	sizes: '192x192',
}, {
	src: 'qux.png',
	sizes: '310x150',
}];

test('Get largest square icon from manifest icons', t => {
	t.deepEqual(getLargestSquareIcon(icons), {
		src: 'baz.png',
		sizes: '192x192',
	});
});

test('Get largest maskable square icon from manifest icons', t => {
	t.deepEqual(getLargestSquareIcon(icons, true), {
		src: 'bar.png',
		sizes: '64x64',
		purpose: 'maskable',
	});
});
