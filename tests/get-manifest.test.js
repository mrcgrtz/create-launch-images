import test from 'ava';
import nock from 'nock';
import getManifest from '../src/get-manifest.js';
import fixture from './fixtures/manifest.js';

const basePath = 'https://example.com';
const url = '/example.webmanifest';

nock(basePath).get(url).reply(200, fixture);
test('Gets a manifest', async t => {
	const manifest = await getManifest(`${basePath}${url}`);
	t.deepEqual(manifest, fixture);
});

nock(basePath).get(url).reply(200, 'I am just a text file.');
test('Handles non-JSON content', async t => {
	const manifest = await getManifest(`${basePath}${url}`);
	t.is(manifest, undefined);
});

nock(basePath).get(url).reply(404);
test('Handles non-existent manifests', async t => {
	const manifest = await getManifest(`${basePath}${url}`);
	t.is(manifest, undefined);
});

nock(basePath).get(url).reply(200, fixture);
test('Handles missing or broken URLs', async t => {
	const manifest = await getManifest(url);
	t.is(manifest, undefined);
});
