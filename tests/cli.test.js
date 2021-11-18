import test from 'ava';
import {execa} from 'execa';
import {getBinPathSync} from 'get-bin-path';

test('Input without flags and value', async t => {
	const binPath = getBinPathSync();
	const error = await t.throwsAsync(() => execa(binPath));
	t.is(error.exitCode, 2);
});
