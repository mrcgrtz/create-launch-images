import fs from 'node:fs';

import getManifest from './get-manifest.js';
import parseManifest from './parse-manifest.js';
import getDeviceByOrientation from './get-device-by-orientation.js';
import createImage from './create-image.js';

/**
 * @param {string} url Manifest URL
 * @param {object} [options] Image options
 * @param {string} [options.outputDir] Output directory
 * @param {'yes'|'no'|'auto'} [options.maskable] Prefer maskable icons
 * @param {boolean} [options.square] Disable squircle radius on icons
 * @param {string} [options.font] Text font family
 * @returns Promise<void>
 */
const lib = (url, options = {}) => (async () => {
	try {
		const manifest = await getManifest(url);
		if (manifest) {
			const parsedManifest = await parseManifest(manifest, url, options.maskable);
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
						icon,
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

export default lib;
