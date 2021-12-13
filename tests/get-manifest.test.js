import test from 'ava';
import nock from 'nock';
import getManifest from '../src/get-manifest.js';
import fixture from './fixtures/manifest.js';

const basePath = 'https://example.com';
const url = '/example.webmanifest';

const scopeOk = nock(basePath).get(url).reply(200, fixture).persist();
test('Gets a manifest', async t => {
	const manifest = await getManifest(`${basePath}${url}`);
	t.deepEqual(manifest, fixture);
});
scopeOk.persist(false);

const scopeOkNonJSON = nock(basePath).get(url).reply(200, 'I am just a text file.').persist();
test('Handles non-JSON content', async t => {
	const manifest = await getManifest(`${basePath}${url}`);
	t.is(manifest, undefined);
});
scopeOkNonJSON.persist(false);

const scopeError = nock(basePath).get(url).reply(404).persist();
test('Handles non-existent manifests', async t => {
	const manifest = await getManifest(`${basePath}${url}`);
	t.is(manifest, undefined);
});
scopeError.persist(false);

const scopeBroken = nock(basePath).get(url).reply(200, fixture).persist();
test('Handles missing or broken URLs', async t => {
	const manifest = await getManifest(url);
	t.is(manifest, undefined);
});
scopeBroken.persist(false);
