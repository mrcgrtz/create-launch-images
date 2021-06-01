import fs from 'node:fs';

import getManifest from './get-manifest.js';
import parseManifest from './parse-manifest.js';
import getDeviceByOrientation from './get-device-by-orientation.js';
import createImage from './create-image.js';

/**
 *
 * @param {string} url Manifest URL
 * @param {object} [options] Image options
 * @param {string} [options.outputDir] Output directory
 * @param {boolean} [options.addRadius] Add a radius to the app icon (prefers maskable icons)
 * @param {string} [options.font] Text font family
 * @returns Promise<void>
 */
const main = (url, options = {}) => (async () => {
	try {
		const manifest = await getManifest(url);
		if (manifest) {
			const parsedManifest = await parseManifest(manifest, url, options.addRadius);
			if (parsedManifest) {
				const {name, color, icon, orientation} = parsedManifest;
				if (!fs.existsSync(options.outputDir)) {
					fs.mkdirSync(options.outputDir);
				}

				const devices = getDeviceByOrientation(orientation);
				for (const device of devices) {
					createImage({
						...device,
						...options,
						name,
						color,
						icon
					});
				}
			}
		} else {
			throw new Error('Could not fetch manifest.');
		}
	} catch {
		throw new Error(`Could not parse ${url}`);
	}
})();

export default main;
