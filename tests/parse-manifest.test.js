import test from 'ava';
import parseManifest from '../src/parse-manifest.js';
import fixture from './fixtures/manifest.js';

test('Parse manifest', async t => {
	const parsedManifest = await parseManifest(fixture, 'https://example.com');
	t.deepEqual(parsedManifest, {
		color: '#2196f3',
		icon: 'https://example.com/images/touch/android-launchericon-512-512.png',
		name: 'The Air Horner',
		orientation: 'any',
	});
});

test('Falls back to white when a background color is missing in the manifest', async t => {
	const augmentedFixture = {...fixture};
	delete augmentedFixture.background_color;
	const parsedManifest = await parseManifest(augmentedFixture, 'https://example.com');
	t.like(parsedManifest, {
		color: '#ffffff',
	});
});

test('Fails when parsing a manifest without valid application name', async t => {
	const augmentedFixture = {...fixture};
	delete augmentedFixture.name;
	const parsedManifest = await parseManifest(augmentedFixture, 'https://example.com');
	t.is(parsedManifest, undefined);
});

test('Fails when parsing a manifest without valid icons', async t => {
	const augmentedFixture = {...fixture};
	delete augmentedFixture.icons;
	const parsedManifest = await parseManifest(augmentedFixture, 'https://example.com');
	t.is(parsedManifest, undefined);
});
