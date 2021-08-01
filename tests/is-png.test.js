import test from 'ava';
import isPNG from '../src/helpers/is-png.js';

test('Has a PNG media type', t => {
	t.true(isPNG({
		type: 'image/png',
	}));
});

test('Has no PNG media type', t => {
	t.false(isPNG({
		type: 'image/gif',
	}));
});

test('Has a .png file extension', t => {
	t.true(isPNG({
		src: 'foobar.png',
	}));
});

test('Has no .png file extension', t => {
	t.false(isPNG({
		src: 'foobar.gif',
	}));
});

test('Has a PNG media type and a .png file extension', t => {
	t.true(isPNG({
		src: 'foobar.png',
		type: 'image/png',
	}));
});

test('Has neither a PNG media type nor a .png file extension', t => {
	t.false(isPNG({}));
});
