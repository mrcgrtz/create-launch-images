import test from 'ava';
import isSquare from '../src/helpers/is-square.js';

test('Is a square icon', t => {
	t.true(isSquare({
		sizes: '64x64'
	}));
});

test('Is a square icon with multiple values', t => {
	t.true(isSquare({
		sizes: '16x16 24x24 32x32 64x64'
	}));
});

test('Is not a square icon', t => {
	t.false(isSquare({
		sizes: '310x150'
	}));
});

test('Is no square icon without sizes declaration', t => {
	t.false(isSquare({}));
});
