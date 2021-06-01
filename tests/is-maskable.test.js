import test from 'ava';
import isMaskable from '../src/helpers/is-maskable.js';

test('Is a maskable icon', t => {
	t.true(isMaskable({
		purpose: 'any maskable'
	}));
});

test('Is not a maskable icon', t => {
	t.false(isMaskable({
		purpose: 'monochrome'
	}));
});

test('No purpose available', t => {
	t.false(isMaskable({}));
});
